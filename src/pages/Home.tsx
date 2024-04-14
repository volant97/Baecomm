/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { previousState } from "../recoil/previous";
import SearchList from "../components/home/SearchList";
import SearchForm from "../components/home/SearchForm";
import ShowMoreBtn from "../components/home/ShowMoreBtn";
import { StContainer } from "../style/home";

function Home() {
  const SELECT = "thumbnail,brand,title,price,description,images";

  const searchedWord = useRef<string>("");

  const [word, setWord] = useState<string>("");
  const [limit, setLimit] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const setSearchedProducts = useSetRecoilState(previousState);

  const fetchData = async (isprevSearchedWord = "") => {
    const API_SEARCH_URL = `https://dummyjson.com/products/search?q=${
      !isprevSearchedWord ? word : isprevSearchedWord
    }&limit=0&select=${SELECT}`;

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
      window.scrollTo(0, prevYOffset);
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

  useEffect(() => {
    const landing = async () => {
      const prevSearchedWord = sessionStorage.getItem("searchedWord");

      try {
        if (prevSearchedWord) {
          await fetchData(prevSearchedWord);
        } else {
          await fetchData();
        }
      } catch (error) {
        console.error(error);
      } finally {
        loadPreviousState();
      }
    };

    landing();

    window.addEventListener("beforeunload", sessionStorageSetItem);

    return () => {
      window.removeEventListener("beforeunload", sessionStorageSetItem);
    };
  }, []);

  return (
    <StContainer>
      <SearchForm
        word={word}
        setWord={setWord}
        searchedWord={searchedWord}
        fetchData={fetchData}
      />
      <SearchList
        totalCount={totalCount}
        limit={limit}
        sessionStorageSetItem={sessionStorageSetItem}
      />
      <ShowMoreBtn totalCount={totalCount} limit={limit} setLimit={setLimit} />
    </StContainer>
  );
}

export default Home;
