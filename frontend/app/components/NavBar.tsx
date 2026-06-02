import Link from 'next/link';

import { getCart } from '../services/api';
import { ProductCart } from '../types';

const NavBar = async () => {
  const cart: ProductCart[] = await getCart();

  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">Online Shop</h1>

        <ul className="nav-products">
          <li>
            <Link href="/" className="products-link">
              Produtos
            </Link>
          </li>
          <li>
            <Link href="/carrinho" className="cart-link">
              Carrinho
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
