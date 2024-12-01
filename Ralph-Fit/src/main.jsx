import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client in React 18
import App from "./App";
import "./index.css";

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
