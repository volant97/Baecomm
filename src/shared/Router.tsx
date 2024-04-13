import Home from "../pages/Home";
import TestPage from "../pages/TestPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TestPage2 from "../pages/TestPage2";
import TestPage3 from "../pages/TestPage3";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test2" element={<TestPage2 />} />
        <Route path="/test3" element={<TestPage3 />} />
        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
