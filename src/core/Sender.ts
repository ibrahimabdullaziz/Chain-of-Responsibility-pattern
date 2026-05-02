import { ApiRequest, Handler, wait } from "./Handler";

export class Sender extends Handler {
  constructor() {
    super("sender", "Sender");
  }

  protected async process(request: ApiRequest) {
    await wait(700);
    request.attempts += 1;

    if (request.settings.networkFailsFirstTry && request.attempts === 1) {
      return {
        status: "failed" as const,
        message: "API send failed on first attempt.",
        continueChain: false,
      };
    }

    request.response = "Fresh API response from server.";

    return {
      status: "success" as const,
      message: "Request was sent successfully.",
      continueChain: false,
    };
  }
}
