import { Handler, wait } from "./Handler";

export class Retry extends Handler {
  constructor() {
    super("retry", "Retry");
  }

  async process(request) {
    await wait(400);

    if (!request.settings.retryEnabled) {
      return {
        status: "success",
        message: "Retry check is disabled, continue.",
        continueChain: true,
      };
    }

    let success = !request.settings.networkFailsFirstTry;
    let attempts = 1;

    while (!success && attempts < 3) {
      attempts++;
      request.logs.push(`Network failed. Retrying... (Attempt ${attempts})`);
      await wait(800);
      success = true;
    }

    request.attempts = attempts;

    return {
      status: success ? "success" : "failed",
      message: success
        ? `Request succeeded after ${attempts} attempt(s).`
        : "Request failed after maximum retries.",
      continueChain: success,
    };
  }
}
