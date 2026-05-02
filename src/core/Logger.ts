import { ApiRequest, Handler, wait } from "./Handler";

export class Logger extends Handler {
  constructor() {
    super("logger", "Logger");
  }

  protected async process(request: ApiRequest) {
    await wait(400);

    if (!request.settings.loggerEnabled) {
      return {
        status: "success" as const,
        message: "Logging is disabled, continue.",
        continueChain: true,
      };
    }

    request.logs.push(`GET ${request.url}`);

    return {
      status: "success" as const,
      message: "Request was logged, continue.",
      continueChain: true,
    };
  }
}
