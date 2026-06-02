'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CheckoutResponse } from '../types/types';
import { checkout } from '../services/api';

const CheckoutForm = () => {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;

    const data = await checkout(email);

    setCheckoutData(data);

    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleCheckout}>
        <input className="input-email" type="email" name="email" placeholder="Seu email" required />
        <button className="cart-btn" type="submit">
          Finalizar compra
        </button>
      </form>

      {checkoutData && (
        <div className="mt-4">
          <h2>{checkoutData.message}</h2>
          <p>Pedido: #{checkoutData.orderId}</p>
          <p>Total: {checkoutData.total}</p>
          <a href={checkoutData.emailPreview} target="_blank" rel="noopener noreferrer">
            Ver e-mail de confirmação
          </a>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
