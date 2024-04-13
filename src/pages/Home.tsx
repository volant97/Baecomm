import { useEffect, useState } from "react";
import styled from "styled-components";
const array = ["hello", "hi", "my", "code", "happy", "nice"];

function Home() {
  let limit = 10;
  const [word, setWord] = useState<string>("");
  const [searchedProducts, setSearchedProducts] = useState<any>(array);

  // const searched = array.filter((item) => item.toLowerCase().includes(word));

  const fetchData = () => {
    const API_SEARCH_URL = `https://dummyjson.com/products/search?q=${word}&limit=${limit}`;
    fetch(API_SEARCH_URL)
      .then((res) => res.json())
      .then((obj) => setSearchedProducts(obj.products));
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    setWord("");
  };

  const handleResetBtnOnClick = () => {
    setSearchedProducts("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StContainer>
      <StSearchForm onSubmit={handleformSubmit}>
        <input value={word} onChange={handleInputOnChange} required />
        <button type="submit">검색</button>
        <button type="button" onClick={handleResetBtnOnClick}>
          리셋
        </button>
      </StSearchForm>
      <StSearchListUl>
        {searchedProducts.length ? (
          searchedProducts.map((item: any, index: number) => (
            <li key={index}>{item.title}</li>
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

const StSearchListUl = styled.ul``;
