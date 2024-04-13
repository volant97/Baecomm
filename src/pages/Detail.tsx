import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productsSelectType } from "../types/apiType";
import styled from "styled-components";

function Detail() {
  const params = useParams();

  const SELECT = "thumbnail,brand,title,price,description,images";
  const cardId = params.id;
  const [searchedProducts, setSearchedProducts] =
    useState<productsSelectType | null>(null);

  const fetchData = () => {
    console.log("cardId : ", cardId);
    console.log("SELECT : ", SELECT);
    const API_SEARCH_URL = `https://dummyjson.com/products/${cardId}?select=${SELECT}`;
    fetch(API_SEARCH_URL)
      .then((res) => res.json())
      .then((obj) => setSearchedProducts(obj));
  };

  const handleBackToListLinkClick = () => {};

  useEffect(() => {
    fetchData();
  }, []);

  console.log("!!! ", searchedProducts);

  return (
    <StContainer>
      <Link to={"/"}>목록으로 돌아가기</Link>
      {searchedProducts ? (
        <StCard>
          <p>{searchedProducts.thumbnail}</p>
          <p>{searchedProducts.brand}</p>
          <p>{searchedProducts.title}</p>
          <p>{searchedProducts.price}</p>
          <p>{searchedProducts.description}</p>
          <p>{searchedProducts.images[0]}...사진 모두 표시하기</p>
        </StCard>
      ) : (
        <p>로딩중</p>
      )}
    </StContainer>
  );
}

export default Detail;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StCard = styled.div`
  padding: 10px;
  border: 1px solid black;
`;
