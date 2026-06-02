'use client';

import { addToCart } from '../services/api';
import { Product } from '../types';

const ProductCard = ({ id, name, description, price, image_url }: Product) => {
  return (
    <li className="product-item group">
      <img src={image_url} alt={name} className="product-img" />

      <div className="product-info">
        <h3 className="product-name">{name}</h3>

        <p className="product-description">{description}</p>

        <div className="product-footer">
          <span className="price-text">R$ {price.toFixed(2)}</span>

          <button className="btn-add-to-cart" onClick={() => addToCart(id)}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
