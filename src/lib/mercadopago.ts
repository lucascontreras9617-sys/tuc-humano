import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

const mercadopagoAccessToken = (import.meta.env.MERCADOPAGO_ACCESS_TOKEN || '').trim();

if (!mercadopagoAccessToken) {
  console.warn('⚠️ Mercado Pago access token no configurado. Agregá MERCADOPAGO_ACCESS_TOKEN en .env');
}

const mpConfig = new MercadoPagoConfig({ accessToken: mercadopagoAccessToken });

export const mpPreference = new Preference(mpConfig);
export const mpPayment = new Payment(mpConfig);
