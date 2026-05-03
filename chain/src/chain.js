class Handler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }

  async handle(request, log) {
    const result = await this.process(request, log);

    if (result.passed && this.next) {
      return this.next.handle(request, log);
    }

    return result;
  }

  async process(request, log) {
    throw new Error("process() not implemented");
  }
}

class AuthHandler extends Handler {
  async process(request, log) {
    await delay(600);

    if (!request.token) {
      log("Auth", " No token — request blocked", "failed");
      return { passed: false, message: "Auth failed: no token." };
    }

    log("Auth", " Token found — request allowed", "success");
    return { passed: true };
  }
}

class CacheHandler extends Handler {
  async process(request, log) {
    await delay(500);

    if (request.useCache) {
      log("Cache", " Cache hit — returning cached response", "stopped");
      return { passed: false, message: "Cache hit: returned cached data" };
    }

    log("Cache", " No cache — checking next handler.", "success");
    return { passed: true };
  }
}

class LoggerHandler extends Handler {
  async process(request, log) {
    await delay(400);
    log("Logger", ` Logged: GET ${request.url}`, "success");
    return { passed: true };
  }
}

class SenderHandler extends Handler {
  async process(request, log) {
    await delay(700);
    log("Sender", " Request sent — got fresh response!", "success");
    return { passed: false, message: "Success: fresh data from server" };
  }
}

export function buildChain() {
  const auth = new AuthHandler();
  const cache = new CacheHandler();
  const logger = new LoggerHandler();
  const sender = new SenderHandler();

  auth.setNext(cache).setNext(logger).setNext(sender);

  return auth;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
