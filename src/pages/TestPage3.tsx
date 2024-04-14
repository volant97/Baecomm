import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function TestPage3() {
  const params = useParams();
  const cardId = params.id;

  const previousLocation = useRef<HTMLDivElement>(null);

  const handleBtnClick = () => {
    if (previousLocation.current) {
      window.scrollTo({
        top: previousLocation.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleYTempBtnClick = () => {
    sessionStorage.setItem("yOffset", String(window.pageYOffset));
  };

  useEffect(() => {
    const isY = Number(sessionStorage.getItem("yOffset"));

    if (isY) {
      window.scroll({ top: isY, left: 0, behavior: "smooth" });
      sessionStorage.removeItem("yOffset");
    }

    const handleBeforeUnload = () => {
      const yy = window.pageYOffset;
      sessionStorage.setItem("yOffset", String(yy));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <StContainer>
      <StTestBox>1</StTestBox>
      <StTestBox>2</StTestBox>
      <StTestBox ref={previousLocation}>3</StTestBox>
      <StTestBox>4</StTestBox>
      <StTestBox>5</StTestBox>
      <StTestBox>6</StTestBox>
      <StTestBox>7</StTestBox>
      <button onClick={handleBtnClick}>스크롤 이동</button>
      <button onClick={handleYTempBtnClick}>현재 y값</button>
      <Link to={"/test2"} onClick={handleYTempBtnClick}>
        이동하기
      </Link>
    </StContainer>
  );
}

export default TestPage3;

const StContainer = styled.div`
  display: flex;
  max-width: 800px;
  border: 3px solid black;
  flex-wrap: wrap;
  padding: 10px 50px;
  gap: 100px 50px;
`;

const StTestBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: #f8b053;
  border: 2px solid black;
`;
