/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productsSelectType } from "../types/apiType";
import styled from "styled-components";

function Detail() {
  const params = useParams();

  const SELECT = "thumbnail,brand,title,price,description,images";
  const cardId = params.id;
  const [detailedProducts, setDetailedProducts] =
    useState<productsSelectType | null>(null);

  const fetchData = () => {
    const API_SEARCH_URL = `https://dummyjson.com/products/${cardId}?select=${SELECT}`;
    fetch(API_SEARCH_URL)
      .then((res) => res.json())
      .then((obj) => setDetailedProducts(obj));
  };

  const handleBackToListLinkClick = () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StContainer>
      <Link to={"/"}>목록으로 돌아가기</Link>
      {detailedProducts ? (
        <StCard>
          <p>{detailedProducts.thumbnail}</p>
          <p>{detailedProducts.brand}</p>
          <p>{detailedProducts.title}</p>
          <p>{detailedProducts.price}</p>
          <p>{detailedProducts.description}</p>
          <p>{detailedProducts.images[0]}...사진 모두 표시하기</p>
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
