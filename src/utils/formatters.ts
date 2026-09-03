import { Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: string }> = {
  INR: { rate: 1, symbol: '₹', prefix: '₹' },
  USD: { rate: 0.0118, symbol: '$', prefix: '$' },
  EUR: { rate: 0.0109, symbol: '€', prefix: '€' },
  GBP: { rate: 0.0094, symbol: '£', prefix: '£' },
  AED: { rate: 0.0433, symbol: 'AED ', prefix: 'AED ' },
};

export function formatPrice(amountINR: number, currency: Currency = 'INR'): string {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = Math.round(amountINR * config.rate);

  if (currency === 'INR') {
    return `₹${converted.toLocaleString('en-IN')}`;
  }
  return `${config.symbol}${converted.toLocaleString('en-US')}`;
}
