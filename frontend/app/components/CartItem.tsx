'use client';

import { useRouter } from 'next/navigation';

import { ProductCart } from '../types/types';
import { updateCart } from '../services/api';

const CartItem = ({ id, name, quantity }: ProductCart) => {
  const router = useRouter();

  const updateQuantity = async (newQuantity: number) => {
    await updateCart(id, newQuantity);

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
