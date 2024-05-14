import { notiApis } from "@apis";
import { jsUtils } from "@web-core";
import webPush from "web-push";
class WebPushManager {
  private _initialized = false;
  private _status:
    | "NO_PUSH_MANAGER"
    | "NOT_INITIALIZED"
    | "INITIALIZING"
    | "INITIALIZED" = "NOT_INITIALIZED";

  private pushManager: PushManager | null = null;

  private registrationWaiter: Promise<null> | null = null;

  public get status() {
    return this._status;
  }
  public get initialized() {
    return this._initialized;
  }

  public waitForInit = async () => {
    if (!this.registrationWaiter) return;
    await this.registrationWaiter;
  };

  private getPushManager = (
    registration: ServiceWorkerRegistration
  ): PushManager | undefined => {
    return (
      registration?.pushManager || (window as any)?.safari?.pushNotification
    );
  };

  public initialize = async () => {
    if (this._initialized) return;
    this._status = "INITIALIZING";

    this.registrationWaiter = new Promise(
      async (resolve: (value: null) => void) => {
        try {
          if (!("serviceWorker" in navigator)) throw new Error();
          let registration = await navigator.serviceWorker.getRegistration();
          if (!registration) {
            registration = await navigator.serviceWorker.register(
              "/service-worker.js",
              {
                scope: "/",
              }
            );
          }
          if (!registration) throw new Error();

          const pushManager = this.getPushManager(registration);
          if (!pushManager) throw new Error();
          this.pushManager = pushManager;
          this._status = "INITIALIZED";
        } catch (e) {
          this._status = "NO_PUSH_MANAGER";
        } finally {
          this._initialized = true;
          resolve(null);
        }
      }
    );
  };

  public subscribe = async () => {
    const pushManager = this.pushManager;

    if (!pushManager) return;

    const subscription: PushSubscription = await pushManager.subscribe({
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      userVisibleOnly: true,
    });

    const permissionState = await pushManager.permissionState({
      userVisibleOnly: true,
    });

    if (permissionState === "denied") return;

    const json = subscription.toJSON();
    const endpoint = json.endpoint;
    const p256dh = json.keys?.p256dh;
    const auth = json.keys?.auth;

    if (!p256dh || !auth || !endpoint) return;

    const _sub: webPush.PushSubscription = {
      endpoint,
      keys: {
        p256dh,
        auth,
      },
    };

    const sub = JSON.stringify(_sub);

    // TODO: api에 서브스크립션 보내기
    // TEST CODE

    // const { isError: notiError } = await notiApis.createNoti(sub);
    // if (notiError) return false;

    await jsUtils.wait(2);
    const { isError: subError } = await notiApis.subscribeNoti(sub);
    if (subError) return false;

    return true;
  };
}

export default new WebPushManager();
