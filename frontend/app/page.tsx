import ProductCard from './components/ProductCard';
import { getProducts } from './services/api';
import { Product } from './types/product.types';

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <section id="products">
      <h2 className="title">Produtos</h2>

      <div>
        <ul className="products-list">
          {products.map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
