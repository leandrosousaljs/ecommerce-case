import { ProductCart } from '../types/index.js';

export const generateEmailTemplate = (orderId: number, total: string, cart: ProductCart[]) => {
  const itemsHtml = cart
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">
            R$ ${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      `,
    )
    .join('');

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">
      <tr>
        <td style="background:#2563eb;padding:24px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;">Online Shop</h1>
        </td>
      </tr>

      <tr>
        <td style="padding:32px;">
          <h2 style="margin-top:0;color:#111827;">Compra realizada com sucesso!</h2>
          <p style="color:#374151;">Obrigado pela sua compra.</p>
          <p style="color:#374151;"><strong>Pedido:</strong> #${orderId}</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:24px;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="padding:12px;text-align:left;">Produto</th>
                <th style="padding:12px;text-align:center;">Qtd</th>
                <th style="padding:12px;text-align:right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="margin-top:24px;text-align:right;">
            <strong style="font-size:18px;">Total: R$ ${total}</strong>
          </div>
        </td>
      </tr>

      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;color:#6b7280;font-size:12px;">
          © Online Shop
        </td>
      </tr>
    </table>
  `;
};
