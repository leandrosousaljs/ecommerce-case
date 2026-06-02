import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';

import { getCart } from '../services/api';
import { ProductCart } from '../types/product.types';

const CartPage = async () => {
  const cart: ProductCart[] = await getCart();

  return (
    <section id="cart">
      <h2 className="title">Carrinho</h2>

      <ul>
        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>

      <CheckoutForm />
    </section>
  );
};

export default CartPage;
