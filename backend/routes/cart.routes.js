import express from 'express';

import { addToCart, getCart, updateCart } from '../controllers/cart.controller.js';

export const cartRouter = express.Router();

cartRouter.get('/', getCart);
cartRouter.post('/', addToCart);
cartRouter.put('/', updateCart);
