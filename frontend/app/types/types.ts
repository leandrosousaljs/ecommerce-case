export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface ProductCart extends Product {
  quantity: number;
}

export interface CheckoutResponse {
  message: string;
  orderId: number;
  total: string;
  emailPreview: string;
}