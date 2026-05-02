import { Handler, wait } from "./Handler";

export class Cache extends Handler {
  constructor() {
    super("cache", "Cache");
  }

  async process(request) {
    await wait(500);

    if (!request.settings.cacheEnabled) {
      return {
        status: "success",
        message: "Cache is disabled, continue.",
        continueChain: true,
      };
    }

    if (request.settings.cacheHit) {
      request.response = "Returned cached API response.";

      return {
        status: "stopped",
        message: "Cache found a response and stopped the request.",
        continueChain: false,
      };
    }

    return {
      status: "success",
      message: "No cache found, continue.",
      continueChain: true,
    };
  }
}
