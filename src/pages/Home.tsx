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
  const [limit, setLimit] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchData = () => {
    const API_SEARCH_URL = `https://dummyjson.com/products/search?q=${word}&limit=0&select=${SELECT}`;
    fetch(API_SEARCH_URL)
      .then((res) => res.json())
      .then((obj) => {
        setSearchedProducts(obj.products);
        setTotalCount(obj.products.length);
        if (obj.products.length < limit) {
          setCount(obj.products.length);
        } else {
          setCount(limit);
        }
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLimit(10);
    setCount(0);
    fetchData();
    setWord("");
  };

  const handleResetBtnClick = () => {
    setSearchedProducts([]);
    setLimit(10);
    setCount(0);
    fetchData();
  };

  const handleProductCardClick = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const handleShowMoreBtnClick = () => {
    setLimit(limit + 10);
    console.log(totalCount - count < 0);
    if (totalCount - count + 10 < 0) {
      setCount(totalCount);
    } else {
      setCount(count + 10);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(searchedProducts);
  console.log(limit);

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
      </StSearchListUl>
      <StShowMoreBtn>
        <button onClick={handleShowMoreBtnClick}>더보기</button>
      </StShowMoreBtn>
      <p>{`${count} / ${totalCount}`}</p>
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
`;

const StShowMoreBtn = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    width: 300px;
    height: 40px;
  }
`;
