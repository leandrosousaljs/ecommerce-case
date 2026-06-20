export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface ProductCart extends Product {
  quantity: number;
}
