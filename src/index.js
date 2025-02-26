import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";

/**
 * Initializes the root ReactDOM instance and renders the App component inside React.StrictMode.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);