'use client';

import { useRouter } from 'next/navigation';
import { ProductCart } from '../types/product.types';
import { API_URL } from '../services/api';

const CartItem = ({ id, name, quantity }: ProductCart) => {
  const router = useRouter();

  const updateQuantity = async (newQuantity: number) => {
    await fetch(`${API_URL}/api/carrinho`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: id,
        quantity: newQuantity,
      }),
    });

    router.refresh();
  };

  return (
    <li key={id}>
      <p>
        {name} - Qtd: {quantity}
      </p>
      <button className="cart-btn" onClick={() => updateQuantity(quantity + 1)}>
        +
      </button>
      <button className="cart-btn" onClick={() => updateQuantity(quantity - 1)}>
        -
      </button>
      <button className="cart-btn" onClick={() => updateQuantity(0)}>
        Remover
      </button>
    </li>
  );
};

export default CartItem;
