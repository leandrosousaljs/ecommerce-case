import Link from 'next/link';

import { SuccessPageProps } from '../types';

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const { orderId, total, emailPreview } = await searchParams;

  return (
    <section id="success">
      <h1 className="success-msg">Compra finalizada com sucesso!</h1>

      <p className="success-pedido">Pedido #{orderId}</p>

      <p className="success-total">Total: R$ {total}</p>

      <Link href={emailPreview} target="_blank" rel="noopener noreferrer" className="success-email">
        Ver e-mail de confirmação
      </Link>

      <Link href="/" className="success-back">
        Voltar para a loja
      </Link>
    </section>
  );
};

export default SuccessPage;
