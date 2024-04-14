import styled from "styled-components";

const ulGap = "30px";
const ulMaxWidth = "800px";

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const StSearchForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;

  input {
    width: 300px;
    padding: 10px 30px;
    border: 2px solid #00b300;
    border-radius: 30px;
    outline: none;

    &::placeholder {
      opacity: 50%;
    }
  }

  button {
    color: white;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: all ease-out 0.2s;

    &.submitBtn {
      background-color: #4848ff;
      width: 70px;
    }

    &.resetBtn {
      background-color: #000000;
    }

    &:hover {
      scale: 1.2;
    }
  }
`;

export const StSearchListUl = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${ulGap};
  max-width: ${ulMaxWidth};

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: calc(100% / 2 - ${ulGap});
    min-width: calc(${ulMaxWidth} / 2 - ${ulGap});
    height: 400px;
    cursor: pointer;

    &:hover {
      .hover {
        color: blue;
      }
    }
  }

  span {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    color: white;
    background-color: #0000003d;
    border-radius: 5px;
  }

  img {
    width: calc(${ulMaxWidth} / 2 - ${ulGap});
    height: 280px;
    object-fit: cover;
    overflow: hidden;
  }

  .textContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 10px;

    h1 {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
    }

    p {
      color: red;
    }
  }

  .none {
    opacity: 0;
    cursor: auto;
  }
`;

export const StShowMoreBtnContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 100px;

  button {
    width: 300px;
    height: 40px;
    background: none;
    border: 1px solid black;
    cursor: pointer;
    transition: all ease-out 0.1s;

    &:hover {
      color: white;
      background-color: #00b300;
      scale: 1.1;
    }
  }

  p {
    position: absolute;
    display: flex;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
`;
