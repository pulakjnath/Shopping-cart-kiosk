# Recommendation Panel — Post Add-to-Cart

Show smart product suggestions after user adds item to cart. Two rows: similar items (same category) + cheaper/pricier alternatives with icons.

---

## Trigger & UX Flow

1. User hits `+` on any `ProductCard`
2. Store records `lastAddedProduct` (new state field)
3. `RecommendationPanel` slides up as bottom sheet / inline section beneath product grid
4. Auto-dismisses after 8s or on panel close btn. Also closes on next add (replaces with new recs)

---

## Recommendation Logic (client-side, no AI)

**Similar products** — same `category`, exclude `lastAddedProduct.id`, max 3 results.

**Cheaper alternatives** — same `category`, price < lastAdded.price, sorted ascending, max 2.

**Pricier alternatives** ("Premium picks") — same `category`, price > lastAdded.price, sorted descending, max 2.

Icons next to alt items:
- Cheaper: `TrendingDown` (green) + "Save $X"
- Pricier: `TrendingUp` (amber) + "+$X"

> [!NOTE]
> All logic is pure filter/sort on `mockProducts`. No network call. Extend to API later.

---

## Proposed Changes

### 1. `engineStore.ts` — [MODIFY]

Add state:
```ts
lastAddedProduct: Product | null;
setLastAddedProduct: (p: Product | null) => void;
```
Set `lastAddedProduct` inside `updateCartItem` when `quantityDelta > 0` and item is newly added (was not in cart before).

---

### 2. `mockData.ts` — [MODIFY]

Add `tags?: string[]` optional field to `Product` interface (future-proofing for tag-based similarity). Not required for MVP.

---

### 3. `[NEW] src/lib/recommendations.ts`

Pure utility:
```ts
getRecommendations(product: Product, allProducts: Product[]) => {
  similar: Product[];
  cheaper: Product[];
  pricier: Product[];
}
```

---

### 4. `[NEW] src/components/recommendations/RecommendationPanel.tsx`

**Layout** (inline, renders below `ProductGrid` in left column):
```
╔══════════════════════════════════╗
║ ✓ "Italian Avocado" added        ║  ← header w/ green check + dismiss X
╠══════════════════════════════════╣
║ 🧺 You may also like             ║
║  [Card] [Card] [Card]            ║  ← similar, horizontal scroll
╠══════════════════════════════════╣
║ 💡 Alternatives                  ║
║  ↓ $1.50 cheaper  [Card]         ║  ← TrendingDown icon, green badge
║  ↑ $3.00 pricier  [Card]         ║  ← TrendingUp icon, amber badge
╚══════════════════════════════════╝
```

**Animation**: `framer-motion` `AnimatePresence` slide-up + fade-in. Falls back to CSS transition if framer not installed.

**Mini product card** inside panel: image thumb (48px) + name + price + add button. Compact vs full `ProductCard`.

---

### 5. `page.tsx` — [MODIFY]

Import `RecommendationPanel` and place directly under `<ProductGrid />`:
```tsx
<section>
  <ProductGrid />
  <RecommendationPanel />   {/* ← new */}
</section>
```

---

## State Flow Diagram

```
User clicks + on ProductCard
    → updateCartItem(product, +1) [engineStore]
        → sets lastAddedProduct = product
            → RecommendationPanel reads lastAddedProduct
                → calls getRecommendations()
                    → renders similar + alt rows
```

---

## Open Questions

> [!IMPORTANT]
> **Q1**: Show panel as **inline section** (pushes content down) or **bottom sheet overlay** (floats above)?
> Inline feels more native for kiosk. Bottom sheet is more mobile-y. Your call.

> [!IMPORTANT]
> **Q2**: Does `framer-motion` exist in this project? If not, use CSS `@keyframes` for slide-up. Check `package.json` or I can check.

> [!IMPORTANT]  
> **Q3**: Current mock data has only **6 products**, many in different categories — recs may be sparse. Want to expand `mockData.ts` with more products (e.g. 3–4 per category) so recs look rich?

---

## Verification Plan

- Add Avocado → panel shows Bananas (same Produce category) as similar
- Cheaper alt shows item with lower price + green TrendingDown icon + "Save $X" badge
- Panel auto-dismisses after 8s
- Adding another product replaces panel with new recs (no stale state)
- Adding same product again (quantity bump) does NOT re-trigger panel
