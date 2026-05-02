import { ApiRequest, Handler, HandlerResult, NotifyStatus, wait } from "./Handler";

export class Retry extends Handler {
  constructor() {
    super("retry", "Retry");
  }

  protected async process(request: ApiRequest) {
    await wait(400);

    if (!request.settings.retryEnabled) {
      request.maxRetries = 0;

      return {
        status: "success" as const,
        message: "Retry is disabled, continue once.",
        continueChain: true,
      };
    }

    request.maxRetries = 1;

    return {
      status: "success" as const,
      message: "Retry is ready. If sending fails, try one more time.",
      continueChain: true,
    };
  }

  async handle(
    request: ApiRequest,
    notify: NotifyStatus,
  ): Promise<HandlerResult> {
    notify(this.id, "running", "Retry is checking retry rules.");

    const retryResult = await this.process(request);
    notify(this.id, retryResult.status, retryResult.message);

    if (!retryResult.continueChain || this.nextHandler === null) {
      return retryResult;
    }

    const firstResult = await this.nextHandler.handle(request, notify);

    if (firstResult.status !== "failed" || request.attempts > request.maxRetries) {
      return firstResult;
    }

    notify(this.id, "running", "First send failed. Retry continues the flow.");
    request.logs.push("Retry: first send failed, trying again.");
    await wait(500);

    return this.nextHandler.handle(request, notify);
  }
}
