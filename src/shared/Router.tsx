import Home from "../pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/common/Layout";
import Detail from "../pages/Detail";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
