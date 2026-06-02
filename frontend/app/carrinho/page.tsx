import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';

import { getCart } from '../services/api';
import { ProductCart } from '../types';

const CartPage = async () => {
  let cart: ProductCart[] = [];

  try {
    cart = await getCart();
  } catch (error) {
    return (
      <section id="cart">
        <h2 className="title">Carrinho</h2>

        <p>Não foi possível carregar o carrinho.</p>
      </section>
    );
  }

  return (
    <section id="cart">
      <h2 className="title">Carrinho</h2>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </ul>

          <CheckoutForm />
        </>
      )}
    </section>
  );
};

export default CartPage;
