"use client";

import { userApis } from "@apis";
import { RefreshTokenStorage } from "@storage";

let instance: TokenManager | null = null;

class TokenManager {
  private accessToken: string | null = null;

  private tokenWaiter: Promise<null> | null = null;

  constructor() {
    if (instance) return instance;
    this.tokenWaiter = new Promise(async (resolver: (value: null) => void) => {
      await this.refreshAccessToken();
      resolver(null);
    });
    instance = this;
  }

  private async waitForTokenSetting() {
    await this.tokenWaiter;
    this.tokenWaiter = null;
  }

  private reset() {
    this.accessToken = null;
    RefreshTokenStorage.remove();
  }

  public setToken({ accessToken, refreshToken }: userApis.LoginResponse) {
    this.accessToken = accessToken;
    RefreshTokenStorage.set(refreshToken);
  }

  public async refreshAccessToken() {
    await this.waitForTokenSetting();
    this.tokenWaiter = new Promise(async (resolver: (value: null) => void) => {
      // local storage 에 refreshToken 있는 경우 silent login후 유저정보 가져옴
      const refreshToken = RefreshTokenStorage.get();
      if (!refreshToken) return this.reset();

      const { data: newToken, isError: tokenError } =
        await userApis.refreshLogin({
          refreshToken,
        });

      if (tokenError) return this.reset();
      this.setToken(newToken);
      resolver(null);
    });
  }

  async getAccessToken() {
    await this.waitForTokenSetting();
    return this.accessToken;
  }
}

export default TokenManager;
