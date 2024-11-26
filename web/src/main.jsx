
import { createRoot } from "react-dom/client";
import "./index.css"; // Global styles
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
