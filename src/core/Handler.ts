export type HandlerStatus = "idle" | "running" | "success" | "failed" | "stopped";

export type ApiRequest = {
  url: string;
  token: string;
  attempts: number;
  maxRetries: number;
  logs: string[];
  response: string;
  settings: {
    authEnabled: boolean;
    cacheEnabled: boolean;
    loggerEnabled: boolean;
    retryEnabled: boolean;
    validToken: boolean;
    cacheHit: boolean;
    networkFailsFirstTry: boolean;
  };
};

export type HandlerResult = {
  status: Exclude<HandlerStatus, "idle" | "running">;
  message: string;
  continueChain: boolean;
};

export type NotifyStatus = (
  handlerId: string,
  status: HandlerStatus,
  message: string,
) => void;

export abstract class Handler {
  protected nextHandler: Handler | null = null;

  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  setNext(handler: Handler) {
    this.nextHandler = handler;
    return handler;
  }

  async handle(
    request: ApiRequest,
    notify: NotifyStatus,
  ): Promise<HandlerResult> {
    notify(this.id, "running", `${this.name} is checking the request.`);

    const result = await this.process(request);
    notify(this.id, result.status, result.message);

    // Important: the current handler controls the flow.
    // It can continue to the next handler or stop the request here.
    if (!result.continueChain || this.nextHandler === null) {
      return result;
    }

    return this.nextHandler.handle(request, notify);
  }

  protected abstract process(
    request: ApiRequest,
  ): Promise<HandlerResult>;
}

export function wait(milliseconds: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}
