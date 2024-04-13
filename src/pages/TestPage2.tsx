import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type productsType = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

function TestPage2() {
  // const [products, setProducts] = useState<productsType[]>([]);
  const [products, setProducts] = useState<any>([]);
  const searched = "9";

  // skip +10으로 페이지네이션
  const fetchData = () => {
    // fetch(`https://dummyjson.com/products/search?q=${searched}`)
    fetch(`https://dummyjson.com/products?limit=10&skip=0&select=title,price`)
      .then((res) => res.json())
      .then((obj) => setProducts(obj.products));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(products);

  return (
    <>
      {products.map((item: any, index: number) => (
        <div key={index}>
          <p>{item.title}</p>
        </div>
      ))}
      <Link to={"/test3"}>여기입니다</Link>
    </>
  );
}

export default TestPage2;
