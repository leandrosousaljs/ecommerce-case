import nodemailer from 'nodemailer';

import transporter from '../config/nodemailer.js';
import { generateEmailTemplate } from '../utils/email-template.js';
import { ProductCart } from '../types/index.js'

export async function sendConfirmationEmail(email: string, orderId: number, total: string, cart: ProductCart[]) {
  const info = await transporter.sendMail({
    from: '"Online Shop" <noreply@shop.com>',
    to: email,
    subject: 'Compra realizada com sucesso',
    html: generateEmailTemplate(orderId, total, cart),
  });

  return nodemailer.getTestMessageUrl(info);
}
