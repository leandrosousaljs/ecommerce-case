import express from 'express';

import { addToCart, updateCart } from '../controllers/cart.controller.js'

export const cartRouter = express.Router();

cartRouter.post('/', addToCart);
cartRouter.put('/', updateCart);