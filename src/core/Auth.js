import { Handler, wait } from "./Handler";

export class Auth extends Handler {
  constructor() {
    super("auth", "Auth");
  }

  async process(request) {
    await wait(500);

    if (!request.settings.authEnabled) {
      return {
        status: "success",
        message: "Auth check is disabled, continue.",
        continueChain: true,
      };
    }

    if (!request.token) {
      return {
        status: "failed",
        message: "No token found. Auth stopped the request.",
        continueChain: false,
      };
    }

    return {
      status: "success",
      message: "Token is valid, continue.",
      continueChain: true,
    };
  }
}
