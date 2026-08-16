import type { ParsedRequirement } from '@workspace/api-client-react';

const knownCities = [
  'Lucknow',
  'Delhi',
  'Noida',
  'Jaipur',
  'Agra',
  'Barabanki',
  'Kanpur',
  'Gurugram',
  'Ghaziabad',
];

export function parseRequirement(text: string): ParsedRequirement {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const quantityMatch =
    normalized.match(/\b(\d[\d,]*)\s*(?:units?|pieces?|bags?|items?|packs?|kits?)\b/i) ??
    normalized.match(/\b(\d[\d,]*)\b/);
  const quantity = Math.max(
    1,
    Number((quantityMatch?.[1] ?? '1').replace(/,/g, '')) || 1,
  );
  const productMatch = normalized.match(
    /\b\d[\d,]*\s*(?:units?|pieces?|bags?|items?|packs?|kits?)?\s*(?:of\s+)?(.+?)(?=\s+(?:for|within|in|budget|prefer)\b|,|$)/i,
  );
  const product = (productMatch?.[1] ?? 'custom rural goods').trim();
  const deadlineMatch = normalized.match(/\bwithin\s+(\d+)\s+days?\b/i);
  const budgetMatch = normalized.match(
    /₹\s*([\d,]+)|\bbudget\s*(?:of|is|:)?\s*₹?\s*([\d,]+)/i,
  );
  const budgetPerUnit = Number(
    (budgetMatch?.[1] ?? budgetMatch?.[2] ?? '0').replace(/,/g, ''),
  );
  const location =
    knownCities.find((city) =>
      normalized.toLowerCase().includes(city.toLowerCase()),
    ) ?? 'Lucknow';
  const lower = normalized.toLowerCase();
  let category = 'textiles';
  if (/(?:food|snack|spice|pickle)/i.test(lower)) category = 'food processing';
  else if (/bamboo/i.test(lower)) category = 'bamboo';
  else if (/handicraft/i.test(lower)) category = 'handicrafts';
  else if (/(?:bag|cloth|stitch|garment|uniform)/i.test(lower)) category = 'textiles';

  return {
    product,
    quantity,
    category,
    location,
    deadlineDays: Math.max(1, Number(deadlineMatch?.[1] ?? 30)),
    budgetPerUnit: Number.isFinite(budgetPerUnit) ? budgetPerUnit : 0,
    womenLedPreference: /women[-\s]?led|women producers?/i.test(lower),
  };
}