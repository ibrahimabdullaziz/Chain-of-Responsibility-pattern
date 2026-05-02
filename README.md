# Chain of Responsibility - Vite Demo

This project demonstrates the **Chain of Responsibility** design pattern implemented in a React application using Vite.

## Project Structure

The project is organized with the following key components:

- **`chain/`**: The main application directory.
  - **`src/chain.js`**: Contains the core logic for the Chain of Responsibility pattern.
  - **`src/App.jsx`**: The main React component providing the interactive UI.
  - **`src/styles.css`**: Styling for the demonstration.

## The Design Pattern

The **Chain of Responsibility** is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

### How it works in this demo:

The request flow follows this sequence:
1. **Auth**: Checks if a token is provided.
2. **Cache**: Checks if a cache hit is enabled (can short-circuit the chain).
3. **Logger**: Logs the request (always passes).
4. **Sender**: The final step in the chain.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd chain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm run dev
```

### Build

To create a production build:
```bash
npm run build
```

## Scenarios to Try

- **Both toggles off**: The request flows through all 4 handlers sequentially.
- **"Has Token" off**: The Auth handler blocks the request immediately.
- **"Cache Hit" on**: The Auth handler passes, but the Cache handler stops the chain, demonstrating short-circuiting logic.

---

Built with ❤️ using React and Vite.
