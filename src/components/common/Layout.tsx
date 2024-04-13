import { Outlet } from "react-router-dom";
import styled from "styled-components";

function Layout() {
  return (
    <StLayout>
      <Outlet />
    </StLayout>
  );
}

export default Layout;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 50px 0;
  border: 2px solid black;
`;
