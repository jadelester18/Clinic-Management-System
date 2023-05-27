import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store, persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SnackBarProvider } from "./context/SnackBarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SnackBarProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SnackBarProvider>
    </PersistGate>
  </Provider>
);
