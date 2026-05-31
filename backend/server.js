import 'dotenv/config';
import express from 'express';

import { productsRouter } from './routes/products.js';
import { cartRouter } from './routes/cart.js';
import { checkoutRouter } from './routes/checkout.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'API running' });
});

app.use('/api/produtos', productsRouter);
app.use('/api/carrinho', cartRouter);
app.use('/api/finalizar-compra', checkoutRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
