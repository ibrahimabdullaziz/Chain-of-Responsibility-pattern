# Chain of Responsibility Demo

A minimal React demo that shows the **Chain of Responsibility** design pattern applied to an API request flow.

## Folder Structure

```
src/
 ├── chain.js   ← The entire pattern (base Handler + 4 concrete handlers)
 ├── App.jsx    ← UI: 2 toggles + visual chain
 └── styles.css ← Styling
```

## Run

```bash
npm install
npm run dev
```

## How It Works

A request passes through a chain of handlers in order:

```
Auth → Cache → Logger → Sender
```

Each handler runs its logic and returns `{ passed: true }` to continue or `{ passed: false }` to stop the chain.

| Handler | Stops if… |
|---|---|
| Auth | No token provided |
| Cache | Cache hit is enabled |
| Logger | Never stops (always passes) |
| Sender | Always stops (final step) |

## Try These Scenarios

| Setup | Result |
|---|---|
| Both toggles off | All 4 handlers run in sequence |
| "Has Token" off | Auth blocks the request immediately |
| "Cache Hit" on | Auth passes, Cache short-circuits the rest |

## Pattern Core (`chain.js`)

```js
class Handler {
  setNext(handler) { this.next = handler; return handler; }

  async handle(request, log) {
    const result = await this.process(request, log);
    if (result.passed && this.next) return this.next.handle(request, log);
    return result;
  }
}
```

Each concrete handler only overrides `process()`. No handler knows about the others.