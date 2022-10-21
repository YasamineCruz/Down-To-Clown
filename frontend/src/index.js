import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { GroupProvider } from './context/GroupContext';
import { ImageModalProvider } from "./context/ImageModal";
import { IndividualImageModalProvider } from "./context/IndividualImageModal";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <GroupProvider>
        <ImageModalProvider>
          <IndividualImageModalProvider>
        <ModalProvider>
            <BrowserRouter>
              <App />
          </BrowserRouter>
      </ModalProvider>
      </IndividualImageModalProvider>
      </ImageModalProvider>
      </GroupProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);