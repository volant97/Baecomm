/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { productsSelectType } from "../types/apiType";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { previousState } from "../recoil/previous";

function Home() {
  const navigate = useNavigate();

  const SELECT = "thumbnail,brand,title,price,description,images";
  const [word, setWord] = useState<string>("");
  const [searchedProducts, setSearchedProducts] = useRecoilState(previousState);
  const [limit, setLimit] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchData = async () => {
    const API_SEARCH_URL = `https://dummyjson.com/products/search?q=${word}&limit=0&select=${SELECT}`;

    try {
      const res = await fetch(API_SEARCH_URL);
      const obj = await res.json();

      setSearchedProducts(obj.products);
      setTotalCount(obj.products.length);

      if (obj.products.length < 10) {
        setLimit(obj.products.length);
      } else {
        setLimit(10);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadPreviousState = () => {
    const yOffsetToNum = Number(sessionStorage.getItem("yOffset"));

    if (yOffsetToNum) {
      window.scroll({ top: yOffsetToNum, left: 0, behavior: "smooth" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    setWord("");
  };

  const handleResetBtnClick = () => {
    setSearchedProducts([]);
    fetchData();
  };

  const handleProductCardClick = (id: number) => {
    sessionStorage.setItem("yOffset", String(window.pageYOffset));
    navigate(`/detail/${id}`);
  };

  const handleShowMoreBtnClick = () => {
    if (totalCount - limit - 10 < 0) {
      setLimit(totalCount);
    } else {
      setLimit(limit + 10);
    }
  };

  useEffect(() => {
    const landing = async () => {
      await fetchData();
      loadPreviousState();
    };

    const handleBeforeunload = () => {
      sessionStorage.setItem("yOffset", String(window.pageYOffset));
    };

    landing();

    window.addEventListener("beforeunload", handleBeforeunload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
  }, []);

  // console.log(searchedProducts);
  // console.log("totalCount : ", totalCount);
  // console.log("limit : ", limit);

  return (
    <StContainer>
      <StSearchForm onSubmit={handleformSubmit}>
        <input value={word} onChange={handleInputChange} required />
        <button type="submit">검색</button>
        <button type="button" onClick={handleResetBtnClick}>
          리셋
        </button>
      </StSearchForm>
      <StSearchListUl>
        {totalCount && limit ? (
          searchedProducts.map((item: productsSelectType, index: number) =>
            index < limit ? (
              <li key={item.id} onClick={() => handleProductCardClick(item.id)}>
                <span>{index + 1}</span>
                <p>{item.thumbnail}</p>
                <p className="hover">{`${item.brand}] ${item.title}`}</p>
                <p>{item.price}</p>
              </li>
            ) : null
          )
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
        {totalCount % 2 !== 0 && totalCount === limit ? (
          <li className="none" />
        ) : null}
      </StSearchListUl>
      <StShowMoreBtnContainer>
        {totalCount !== limit ? (
          <button onClick={handleShowMoreBtnClick}>더보기</button>
        ) : null}
        <p>{`${limit} / ${totalCount}`}</p>
      </StShowMoreBtnContainer>
    </StContainer>
  );
}

export default Home;

const ulGap = "20px";
const ulMaxWidth = "800px";

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StSearchForm = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StSearchListUl = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${ulGap};
  max-width: ${ulMaxWidth};

  li {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: calc(100% / 2 - ${ulGap});
    min-width: calc(${ulMaxWidth} / 2 - ${ulGap});
    height: 300px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      .hover {
        color: blue;
      }
    }
  }

  span {
    color: red;
  }

  .none {
    opacity: 0;
    cursor: auto;
  }
`;

const StShowMoreBtnContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    width: 300px;
    height: 40px;
  }

  p {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
