/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { productsSelectType } from "../types/apiType";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { previousState } from "../recoil/previous";
import ScrollToTopBtn from "../components/common/ScrollToTopBtn";

function Home() {
  const navigate = useNavigate();

  const SELECT = "thumbnail,brand,title,price,description,images";
  const [word, setWord] = useState<string>("");
  const searchedWord = useRef<string>("");
  const [searchedProducts, setSearchedProducts] = useRecoilState(previousState);
  const [limit, setLimit] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchData = async (isprevSearchedWord = "") => {
    const API_SEARCH_URL = `https://dummyjson.com/products/search?q=${
      !isprevSearchedWord ? word : isprevSearchedWord
    }&limit=27&select=${SELECT}`;

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
    const prevYOffset = Number(sessionStorage.getItem("yOffset"));
    const prevSearchedWord = sessionStorage.getItem("searchedWord");
    const prevLimit = Number(sessionStorage.getItem("limit"));
    const prevTotalCount = Number(sessionStorage.getItem("totalCount"));

    if (prevYOffset) {
      window.scroll({ top: prevYOffset, left: 0, behavior: "smooth" });
    }

    if (prevSearchedWord) {
      searchedWord.current = prevSearchedWord;
    }

    if (prevLimit) {
      setLimit(prevLimit);
    }

    if (prevTotalCount) {
      setTotalCount(prevTotalCount);
    }
  };

  const sessionStorageSetItem = () => {
    sessionStorage.setItem("yOffset", String(window.pageYOffset));
    sessionStorage.setItem("searchedWord", searchedWord.current);
    sessionStorage.setItem("limit", String(limit));
    sessionStorage.setItem("totalCount", String(totalCount));
  };

  const sessionStorageRemoveItem = () => {
    sessionStorage.clear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    searchedWord.current = e.target.value;
  };

  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    setWord("");
  };

  const handleResetBtnClick = () => {
    setWord("");
    searchedWord.current = "";
    setSearchedProducts([]);
    sessionStorageRemoveItem();
    fetchData();
  };

  const handleProductCardClick = (id: number) => {
    sessionStorageSetItem();
    navigate(`/detail/${id}`);
  };

  const handleShowMoreBtnClick = () => {
    if (totalCount - limit - 10 < 0) {
      setLimit(totalCount);
    } else {
      setLimit(limit + 10);
    }
  };

  console.log(searchedWord.current);

  useEffect(() => {
    const landing = async () => {
      const prevSearchedWord = sessionStorage.getItem("searchedWord");
      if (prevSearchedWord) {
        await fetchData(prevSearchedWord);
      } else {
        await fetchData();
      }

      loadPreviousState();
    };

    landing();

    window.addEventListener("beforeunload", sessionStorageSetItem);

    return () => {
      window.removeEventListener("beforeunload", sessionStorageSetItem);
    };
  }, []);

  return (
    <StContainer>
      <StSearchForm onSubmit={handleformSubmit}>
        <input
          value={word}
          onChange={handleInputChange}
          placeholder={searchedWord.current}
          required
        />
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
                <img src={item.thumbnail} alt="썸네일" />
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
      <ScrollToTopBtn />
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

  input::placeholder {
    opacity: 50%;
  }
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

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 20px;
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
