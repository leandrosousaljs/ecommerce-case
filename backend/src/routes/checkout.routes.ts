import express from 'express';

import { postCheckout } from '../controllers/checkout.controller.js'

export const checkoutRouter = express.Router();

checkoutRouter.post('/', postCheckout);
