'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { checkout } from '../services/api';

const CheckoutForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);

      const email = formData.get('email') as string;

      const data = await checkout(email);

      router.push(
        `/sucesso?orderId=${data.orderId}&total=${data.total}&emailPreview=${encodeURIComponent(data.emailPreview)}`,
      );
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao finalizar compra. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleCheckout} className="checkout-form">
        <input className="email-input" type="email" name="email" placeholder="Seu email" required />
        <button className="btn-checkout" type="submit" disabled={loading}>
          {loading ? 'Finalizando...' : 'Finalizar compra'}
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
