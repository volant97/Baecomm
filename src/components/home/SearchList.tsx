import { useNavigate } from "react-router-dom";
import { StSearchListUl } from "../../style/home";
import { productsSelectType } from "../../types/apiType";
import { useRecoilValue } from "recoil";
import { previousState } from "../../recoil/previous";

type propsType = {
  totalCount: number;
  limit: number;
  sessionStorageSetItem: () => void;
};

function SearchList({ totalCount, limit, sessionStorageSetItem }: propsType) {
  const navigate = useNavigate();

  const searchedProducts = useRecoilValue(previousState);

  const handleProductCardClick = (id: number) => {
    sessionStorageSetItem();
    navigate(`/detail/${id}`);
  };

  return (
    <StSearchListUl>
      {totalCount && limit ? (
        searchedProducts.map((item: productsSelectType, index: number) =>
          index < limit ? (
            <li key={item.id} onClick={() => handleProductCardClick(item.id)}>
              <span>{index + 1}</span>
              <img src={item.thumbnail} alt="썸네일" />
              <div className="textContainer">
                <h1 className="hover">{`[${item.brand}] ${item.title}`}</h1>
                <p>$ {item.price}</p>
              </div>
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
  );
}

export default SearchList;
