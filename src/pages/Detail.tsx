/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productsSelectType } from "../types/apiType";
import {
  StCard,
  StCardImgGroupContainer,
  StContainer,
  StImgContainer,
  StTextContainer,
  StThumnailImg,
} from "../style/detail";
import Card from "../components/detail/Card";

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StContainer>
      <Link to={"/"}>목록으로 돌아가기</Link>
      {detailedProducts ? (
        <Card detailedProducts={detailedProducts} />
      ) : (
        <p>로딩중</p>
      )}
    </StContainer>
  );
}

export default Detail;
