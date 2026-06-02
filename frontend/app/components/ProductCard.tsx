'use client';

import { addToCart } from '../services/api';
import { Product } from '../types';

const ProductCard = ({ id, name, description, price, image_url }: Product) => {
  return (
    <li className="products-item">
      <img src={image_url} alt={name} className="products-image" />

      <div className="mt-4">
        <h3 className="subtitle">{name}</h3>

        <p className="description">{description}</p>

        <div className="price-container">
          <span className="price-text">R$ {price.toFixed(2)}</span>

          <button className="price-btn" onClick={() => addToCart(id)}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
