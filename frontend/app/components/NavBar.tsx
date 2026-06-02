import Link from 'next/link';

const NavBar = () => {
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
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
