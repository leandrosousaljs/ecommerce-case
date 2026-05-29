import express from 'express';
import { getProducts } from '../controllers/productsController.js';

export const productsRouter = express.Router();

productsRouter.get('/', getProducts);
