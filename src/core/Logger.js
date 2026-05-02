import { Handler, wait } from "./Handler";

export class Logger extends Handler {
  constructor() {
    super("logger", "Logger");
  }

  async process(request) {
    await wait(400);

    if (!request.settings.loggerEnabled) {
      return {
        status: "success",
        message: "Logging is disabled, continue.",
        continueChain: true,
      };
    }

    request.logs.push(`GET ${request.url}`);

    return {
      status: "success",
      message: "Request was logged, continue.",
      continueChain: true,
    };
  }
}
