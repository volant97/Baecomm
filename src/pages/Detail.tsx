/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/detail/Card";
import { StContainer } from "../style/detail";
import { productsSelectType } from "../types/apiType";
import { useRecoilValue } from "recoil";
import { previousState } from "../recoil/previous";

function Detail() {
  const params = useParams();

  const SELECT = "thumbnail,brand,title,price,description,images";
  const cardId = Number(params.id);

  const [detailedProducts, setDetailedProducts] =
    useState<productsSelectType | null>(null);
  const searchedProducts = useRecoilValue(previousState);

  const filteredProdict = searchedProducts.filter(
    (item: productsSelectType) => {
      return item.id === cardId;
    }
  );

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
    if (filteredProdict.length === 0) {
      fetchData();
    } else {
      setDetailedProducts(filteredProdict[0]);
    }
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
