import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

const mercadopagoAccessToken = "APP_USR-1556063843005902-043011-5cb0969ac32ef83b7613f69776f226db-3368960107".trim();
if (!mercadopagoAccessToken) {
  console.warn("⚠️ Mercado Pago access token no configurado. Agregá MERCADOPAGO_ACCESS_TOKEN en .env");
}
const mpConfig = new MercadoPagoConfig({ accessToken: mercadopagoAccessToken });
const mpPreference = new Preference(mpConfig);
const mpPayment = new Payment(mpConfig);

export { mpPayment as a, mpPreference as m };
