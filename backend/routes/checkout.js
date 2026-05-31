import express from 'express';

import { postCheckout } from '../controllers/checkoutController.js'

export const checkoutRouter = express.Router();

checkoutRouter.post('/', postCheckout);
