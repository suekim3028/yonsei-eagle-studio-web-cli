import { jsUtils } from "@web-core";
import { redirect } from "next/navigation";
import webPush from "web-push";
class WebPushManager {
  private _initialized = false;
  private _status:
    | "NO_SERVICE_WORKER"
    | "NOT_INITIALIZED"
    | "INITIALIZING"
    | "INITIALIZED" = "NOT_INITIALIZED";

  private registration: ServiceWorkerRegistration | null = null;

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

  public initialize = async () => {
    if (this._initialized) return;
    if (!("serviceWorker" in navigator)) {
      this._status = "NO_SERVICE_WORKER";
      console.log("[WEB PUSH] no service worker");
      this._initialized = true;
      return;
    }
    this._status = "INITIALIZING";

    this.registrationWaiter = new Promise(
      async (resolve: (value: null) => void) => {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          console.log("[WEB PUSH] already registrated");
          this.registration = registration;
        } else {
          const newRegistration = await navigator.serviceWorker.register(
            "service-worker.js"
          );
          console.log("[WEB PUSH] get new registrated");
          this.registration = newRegistration;
        }
        console.log("[WEB PUSH] registration finished");
        this._status = "INITIALIZED";
        resolve(null);
        this._initialized = true;
      }
    );
  };

  private arrayBufferToString = async (buffer: ArrayBuffer) => {
    return await new Promise((resolve: (value: string | null) => void) => {
      const blob = new Blob([buffer], { type: "text/plain" });
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          resolve(e.target.result);
        } else {
          resolve(null);
        }
      };
      reader.readAsText(blob);
    });
  };

  public subscribe = async () => {
    if (!this.registration) return;

    const subscription: PushSubscription =
      await this.registration.pushManager.subscribe({
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        userVisibleOnly: true,
      });

    const endpoint = subscription.endpoint;
    const p256dhBuffer = subscription.getKey("p256dh");
    const authBuffer = subscription.getKey("auth");

    if (!p256dhBuffer || !authBuffer) return;
    const p256dh = await this.arrayBufferToString(p256dhBuffer);
    const auth = await this.arrayBufferToString(authBuffer);

    if (!p256dh || !auth) return;

    const _sub: webPush.PushSubscription = {
      endpoint,
      keys: {
        p256dh,
        auth,
      },
    };

    // TODO: api에 서브스크립션 보내기
    // TEST CODE
    (async () => {
      await jsUtils.wait(10);
      redirect(`/send-push?subscription=${JSON.stringify(_sub)}`);
    })();
  };
}

export default new WebPushManager();
