'use client';

import { useRouter } from 'next/navigation';

import type { ProductCart } from '../types';
import { updateCart } from '../services/api';
import { formatter } from '../utils/formatter';

const CartItem = ({ id, name, quantity, price }: ProductCart) => {
  const router = useRouter();

  const updateQuantity = async (newQuantity: number) => {
    await updateCart(id, newQuantity);

    router.refresh();
  };

  return (
    <li className="cart-item">
      <p className="cart-item-name">
        {name} - Qtd: {quantity} - Subtotal: {formatter.format(price * quantity)}
      </p>
      <button className="btn-increase" onClick={() => updateQuantity(quantity + 1)}>
        +
      </button>
      <button className="btn-decrease" onClick={() => updateQuantity(quantity - 1)}>
        -
      </button>
      <button className="btn-remove" onClick={() => updateQuantity(0)}>
        Remover
      </button>
    </li>
  );
};

export default CartItem;
