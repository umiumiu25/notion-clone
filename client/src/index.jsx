import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import { store } from "./redux/store.js";
// import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
