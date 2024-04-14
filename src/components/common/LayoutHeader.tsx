import styled from "styled-components";

function LayoutHeader() {
  return (
    <StLayout>
      <div>
        <h1>배컴 프론트엔드 개발자 사전과제</h1>
        <h1>윤창근</h1>
      </div>
    </StLayout>
  );
}

export default LayoutHeader;

const StLayout = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 40px;
  color: white;
  font-size: 20px;
  /* background-color: green; */
  background-image: linear-gradient(to right, #00b300, 80%, #0000ff);

  div {
    display: flex;
    justify-content: space-between;
    width: 800px;
    margin: 0 20px;
  }
`;
