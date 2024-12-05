import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux"; // Импортируем Provider
import { store } from "./redux/store"; // Импортируем ваш Redux Store
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Оборачиваем App в Provider */}
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Сбрасывает базовые стили браузера */}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
