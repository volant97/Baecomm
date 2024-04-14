import React from "react";
import { StShowMoreBtnContainer } from "../../style/home";

type propsType = {
  totalCount: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

function ShowMoreBtn({ totalCount, limit, setLimit }: propsType) {
  const handleShowMoreBtnClick = () => {
    if (totalCount - limit - 10 < 0) {
      setLimit(totalCount);
    } else {
      setLimit(limit + 10);
    }
  };

  return (
    <StShowMoreBtnContainer>
      {totalCount !== limit ? (
        <button onClick={handleShowMoreBtnClick}>더보기</button>
      ) : null}
      <p>{`${limit} / ${totalCount}`}</p>
    </StShowMoreBtnContainer>
  );
}

export default ShowMoreBtn;
