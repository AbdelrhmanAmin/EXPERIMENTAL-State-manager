import { Provider } from "@Redux-like/react";
import { applyMiddleware, createStore } from "redux-like-core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import rootReducer from "./reducers";

export const store = createStore(rootReducer);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
