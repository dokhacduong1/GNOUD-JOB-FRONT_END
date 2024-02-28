
import ReactDOM from 'react-dom/client';
import App from "./App";
import { createStore } from "redux";
import allReducers from "./stores/index";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.scss";

const store = createStore(allReducers);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

