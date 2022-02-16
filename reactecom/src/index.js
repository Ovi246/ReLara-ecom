import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { popper } from "@popperjs/core";
import "../src/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "./styles/scss/sb-admin-2.scss";
import "../src/assets/vendor/fontawesome-free/css/all.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
