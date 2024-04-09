import Home from "../pages/Home";
import TestPage from "../pages/TestPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
