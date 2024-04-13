export type productsOriginalType = {
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

export type productsSelectType = {
  id: number;
  thumbnail: string;
  brand: string;
  title: string;
  price: number;
  description: string;
  images: string[];
};
