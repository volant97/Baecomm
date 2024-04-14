import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ScrollToTopBtn from "./ScrollToTopBtn";
import LayoutHeader from "./LayoutHeader";

function Layout() {
  return (
    <StLayout>
      <LayoutHeader />
      <Outlet />
      <ScrollToTopBtn />
    </StLayout>
  );
}

export default Layout;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
