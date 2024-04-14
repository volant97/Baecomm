import {
  StCard,
  StCardImgGroupContainer,
  StImgContainer,
  StTextContainer,
  StThumnailImg,
} from "../../style/detail";
import { productsSelectType } from "../../types/apiType";

type propsType = {
  detailedProducts: productsSelectType;
};

function Card({ detailedProducts }: propsType) {
  return (
    <div>
      <StCard>
        <StCardImgGroupContainer>
          <StThumnailImg>
            <img src={detailedProducts.thumbnail} alt="썸네일" />
          </StThumnailImg>
          <StImgContainer>
            {detailedProducts.images.map((item, index) => (
              <img key={index} src={item} alt={`상품 이미지 ${index + 1}`} />
            ))}
          </StImgContainer>
        </StCardImgGroupContainer>
        <StTextContainer>
          <h1>{detailedProducts.brand}</h1>
          <h2>{detailedProducts.title}</h2>
          <h3>$ {detailedProducts.price}</h3>
          <p>{detailedProducts.description}</p>
        </StTextContainer>
      </StCard>
    </div>
  );
}

export default Card;
