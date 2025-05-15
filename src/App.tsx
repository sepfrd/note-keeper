import { ToastProvider } from "@/providers/ToastProvider";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import GlobalToast from "@/components/GlobalToast";

function App() {
  return (
    <ToastProvider>
      <GlobalToast />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
    </ToastProvider>
  );
}

export default App;
