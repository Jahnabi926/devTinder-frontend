import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import AppRouter from "./App.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={AppRouter} />
    </Provider>
  </StrictMode>,
);
