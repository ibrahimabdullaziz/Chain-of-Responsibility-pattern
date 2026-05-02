import { ApiRequest, Handler, wait } from "./Handler";

export class Cache extends Handler {
  constructor() {
    super("cache", "Cache");
  }

  protected async process(request: ApiRequest) {
    await wait(500);

    if (!request.settings.cacheEnabled) {
      return {
        status: "success" as const,
        message: "Cache is disabled, continue.",
        continueChain: true,
      };
    }

    if (request.settings.cacheHit) {
      request.response = "Returned cached API response.";

      return {
        status: "stopped" as const,
        message: "Cache found a response and stopped the request.",
        continueChain: false,
      };
    }

    return {
      status: "success" as const,
      message: "No cache found, continue.",
      continueChain: true,
    };
  }
}
