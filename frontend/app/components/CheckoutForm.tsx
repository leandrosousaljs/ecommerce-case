'use client';

import { useRouter } from 'next/navigation';

import { API_URL } from '../services/api';
import { useState } from 'react';

const CheckoutForm = () => {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState(null);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get('email');

    const res = await fetch(`${API_URL}/api/finalizar-compra`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    setCheckoutData(data);

    if (res.ok) {
      router.refresh();
    }
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
