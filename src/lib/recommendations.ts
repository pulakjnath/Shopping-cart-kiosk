import { Product } from './mockData';

export interface Recommendations {
  similar: Product[];
  cheaper: Product[];
  pricier: Product[];
}

/**
 * Pure fn — no side effects.
 * similar: same category, exclude source, max 3
 * cheaper: same category, price < source, sorted asc, max 2
 * pricier: same category, price > source, sorted desc, max 2
 */
export function getRecommendations(
  source: Product,
  allProducts: Product[],
): Recommendations {
  const sameCategory = allProducts.filter(
    (p) => p.category === source.category && p.id !== source.id,
  );

  const cheaper = [...sameCategory]
    .filter((p) => p.price < source.price)
    .sort((a, b) => a.price - b.price)
    .slice(0, 2);

  const pricier = [...sameCategory]
    .filter((p) => p.price > source.price)
    .sort((a, b) => b.price - a.price)
    .slice(0, 2);

  // Similar = rest of same-category items not already in alt lists
  const altIds = new Set([...cheaper, ...pricier].map((p) => p.id));
  const similar = sameCategory.filter((p) => !altIds.has(p.id)).slice(0, 3);

  return { similar, cheaper, pricier };
}
