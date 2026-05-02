export class Handler {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  async handle(request, notify) {
    notify(this.id, "running", `${this.name} is checking the request.`);

    const result = await this.process(request);
    notify(this.id, result.status, result.message);

    if (!result.continueChain || this.nextHandler === null) {
      return result;
    }

    return this.nextHandler.handle(request, notify);
  }

  async process(request) {
    throw new Error("Method 'process()' must be implemented.");
  }
}

export function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}
