import express from 'express';
import cors from 'cors';
import type { Response, Request } from 'express';

import { PORT } from './config/env.js';

import { productsRouter } from './routes/products.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import { checkoutRouter } from './routes/checkout.routes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res: Response): void => {
  res.send({ message: 'API running' });
});

app.use('/api/produtos', productsRouter);
app.use('/api/carrinho', cartRouter);
app.use('/api/finalizar-compra', checkoutRouter);

app.use((req, res): void => {
  res.status(404).json({
    error: 'Rota não encontrada',
  });
});

app.use((err: any, req: Request, res: Response, next: any): void => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
