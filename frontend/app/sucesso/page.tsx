import Link from 'next/link';

import { SuccessPageProps } from '../types';

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const { orderId, total, emailPreview } = await searchParams;

  return (
    <section>
      <h1>Compra finalizada com sucesso!</h1>

      <p>Pedido #{orderId}</p>

      <p>Total: R$ {total}</p>

      <Link href={emailPreview} target="_blank" rel="noopener noreferrer">
        Ver e-mail de confirmação
      </Link>

      <Link href="/">Voltar para a loja</Link>
    </section>
  );
};

export default SuccessPage;
