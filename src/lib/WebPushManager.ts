import { jsUtils } from "@web-core";

class WebPushManager {
  private initialized = false;
  private status: "NO_SERVICE_WORKER" | "NOT_INITIALIZED" | "INITIALIZED" =
    "NOT_INITIALIZED";

  private registration: ServiceWorkerRegistration | null = null;

  public initialize = async () => {
    if (this.initialized) return;
    if (!("serviceWorker" in navigator)) {
      this.status = "NO_SERVICE_WORKER";
      return;
    }

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      this.registration = registration;
    } else {
      const newRegistration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      this.registration = newRegistration;
    }
  };

  public subscribe = async () => {
    if (!this.registration) return;

    const subscription = await this.registration.pushManager.subscribe({
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      userVisibleOnly: true,
    });

    // TODO: api에 서브스크립션 보내기
    // TEST CODE
    await jsUtils.wait(10);
  };
}
