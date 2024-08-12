import React from "react";
import ReactDOM from "react-dom/client";

//redux
import store from "./redux/store";
import { Provider } from "react-redux";

//global styles
import "./global.css";

//components
import Router from "./Router";
import WebSocket from "./components/WebSocket";

import "./utils/string";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocket />
      <Router />
    </Provider>
  </React.StrictMode>
);
