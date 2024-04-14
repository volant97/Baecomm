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

  const fetchData = async () => {
    const API_SEARCH_URL = `https://dummyjson.com/products/${cardId}?select=${SELECT}`;

    try {
      const res = await fetch(API_SEARCH_URL);
      const obj = await res.json();

      setDetailedProducts(obj);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackToListLinkClick = () => {};

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("!!", detailedProducts?.images);

  return (
    <StContainer>
      <Link to={"/"}>목록으로 돌아가기</Link>
      {detailedProducts ? (
        <StCard>
          <img src={detailedProducts.thumbnail} alt="썸네일" />
          <div>
            <p>{detailedProducts.brand}</p>
            <p>{detailedProducts.title}</p>
            <p>{detailedProducts.price}</p>
            <p>{detailedProducts.description}</p>
          </div>
          <StImgContainer>
            {detailedProducts.images.map((item, index) => (
              <img key={index} src={item} alt={`상품 이미지 ${index + 1}`} />
            ))}
          </StImgContainer>
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
  max-width: 800px;
`;

const StCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 20px;
`;

const StImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
  gap: 20px;
  max-width: 800px;
  border: 2px solid black;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 20px;
  }
`;
