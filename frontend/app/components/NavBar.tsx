import Link from 'next/link';

const NavBar = () => {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="text-3xl">Online Shop</h1>

        <ul className="flex gap-2">
          <li>
            <Link href="/">Produtos</Link>
          </li>
          <li>
            <Link href="/carrinho">Carrinho</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
