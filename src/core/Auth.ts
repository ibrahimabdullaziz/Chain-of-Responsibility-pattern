import { ApiRequest, Handler, wait } from "./Handler";

export class Auth extends Handler {
  constructor() {
    super("auth", "Auth");
  }

  protected async process(request: ApiRequest) {
    await wait(500);

    if (!request.settings.authEnabled) {
      return {
        status: "success" as const,
        message: "Auth check is disabled, continue.",
        continueChain: true,
      };
    }

    if (!request.token) {
      return {
        status: "failed" as const,
        message: "No token found. Auth stopped the request.",
        continueChain: false,
      };
    }

    return {
      status: "success" as const,
      message: "Token is valid, continue.",
      continueChain: true,
    };
  }
}
