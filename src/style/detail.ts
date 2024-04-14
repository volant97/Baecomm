import styled from "styled-components";

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 800px;
  margin-bottom: 150px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 30px;
    color: black;
    font-size: 13px;
    text-decoration: none;
    border: 2px solid black;
    border-radius: 20px;
    transition: all ease-out 0.2s;

    &:hover {
      scale: 1.1;
    }
  }
`;

export const StCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  width: 100%;
`;

export const StCardImgGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 800px;
  height: 600px;
`;

export const StThumnailImg = styled.div`
  width: 75%;
  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

export const StImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 25%;
  height: 100%;
  overflow-y: scroll;

  /* &::-webkit-scrollbar {
    display: none;
  } */

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

export const StTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  line-height: 1.5;

  h1 {
    font-size: 16px;
    font-weight: bold;
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  h3 {
    font-size: 16px;
    color: red;
  }

  p {
    margin-top: 20px;
  }
`;
