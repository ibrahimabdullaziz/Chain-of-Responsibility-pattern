import { Handler, wait } from "./Handler";

export class Sender extends Handler {
  constructor() {
    super("sender", "Sender");
  }

  async process(request) {
    await wait(600);

    request.response = "Fresh API response from server.";

    return {
      status: "success",
      message: "Request was sent successfully.",
      continueChain: false,
    };
  }
}
