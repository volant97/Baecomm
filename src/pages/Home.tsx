/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { productsSelectType } from "../types/apiType";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const SELECT = "thumbnail,brand,title,price,description,images";
  let limit = 10;
  const [word, setWord] = useState<string>("");
  const [searchedProducts, setSearchedProducts] = useState<
    productsSelectType[]
  >([]);

  const fetchData = () => {
    const API_SEARCH_URL = `https://dummyjson.com/products/search?q=${word}&limit=${limit}&select=${SELECT}`;
    fetch(API_SEARCH_URL)
      .then((res) => res.json())
      .then((obj) => setSearchedProducts(obj.products));
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
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(searchedProducts);

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
        {searchedProducts.length ? (
          searchedProducts.map((item: productsSelectType) => (
            <li key={item.id} onClick={() => handleProductCardClick(item.id)}>
              <p>{item.thumbnail}</p>
              <p className="hover">{`${item.brand}] ${item.title}`}</p>
              <p>{item.price}</p>
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </StSearchListUl>
    </StContainer>
  );
}

export default Home;

const StContainer = styled.div`
  /* border: 2px solid green; */
`;

const StSearchForm = styled.form``;

const StSearchListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;

    &:hover {
      .hover {
        color: blue;
      }
    }
  }
`;
