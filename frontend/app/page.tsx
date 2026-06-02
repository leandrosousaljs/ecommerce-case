import ProductCard from './components/ProductCard';
import { getProducts } from './services/api';
import { Product } from './types';

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    return (
      <section id="products">
        <h2 className="title">Produtos</h2>

        <p>Não foi possível carregar os produtos.</p>
      </section>
    );
  }

  return (
    <section id="products">
      <h2 className="title">Produtos</h2>

      {products.length === 0 ? (
        <p>Nenhum produto disponível no momento.</p>
      ) : (
        <ul className="products-list">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ul>
      )}
    </section>
  );
}
