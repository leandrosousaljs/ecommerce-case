import express from 'express';

import { productsRouter } from './routes/products.js';
import { cartRouter } from './routes/cart.js'

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'API running' });
});

app.use('/api/products', productsRouter);
app.use('/api/carrinho', cartRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
