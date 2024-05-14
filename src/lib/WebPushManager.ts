import { notiApis } from "@apis";
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
          console.log("[WEB PUSH] get new registrated");
          const newRegistration = await navigator.serviceWorker.register(
            "/service-worker.js",
            {
              scope: "/",
            }
          );
          console.log("[WEB PUSH] new registration ended");
          this.registration = newRegistration;
        }
        console.log("[WEB PUSH] registration finished");
        this._status = "INITIALIZED";
        resolve(null);
        this._initialized = true;
      }
    );
  };

  public subscribe = async () => {
    console.log("SUBSCRIBE!");

    const pushManager =
      this.registration?.pushManager ||
      (window as any)?.safari?.pushNotification;

    if (!pushManager) return;

    console.log("START SUBSCRIBE");
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

    const { isError: subError } = await notiApis.subscribeNoti(sub);
    if (subError) return false;
    const { isError: notiError } = await notiApis.createNoti(sub);
    if (notiError) return false;

    return true;
  };
}
