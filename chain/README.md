# Chain of Responsibility Demo

This sub-project contains the interactive React demonstration of the **Chain of Responsibility** design pattern.

## Folder Structure

```text
src/
 ├── chain.js   ← The core logic (Base Handler + 4 Concrete handlers)
 ├── App.jsx    ← React UI with state toggles & visual feedback
 └── styles.css ← Premium glassmorphism styling
```

## Local Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

## The Chain Logic

The request flow follows a strict sequence. Each handler has the authority to either continue or stop the chain.

| Handler    | Responsibility           | Stopping Condition            |
| :--------- | :----------------------- | :---------------------------- |
| **Auth**   | Security check           | No token provided             |
| **Cache**  | Performance optimization | Cache hit is enabled          |
| **Logger** | Monitoring               | Never stops (non-blocking)    |
| **Sender** | Final execution          | Always stops (terminal point) |

## Scenarios to Test

- **Standard Success**: Toggle "Has Token" ON and "Cache Hit" OFF. The request will traverse the entire chain.
- **Short-Circuit (Cache)**: Toggle "Cache Hit" ON. The chain stops at the Cache handler, simulating a fast response.
- **Security Block**: Toggle "Has Token" OFF. The chain stops at the very beginning.

---

_Part of the [Design Patterns Showcase](../README.md)_
