export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  weight: string;
  imageUrl: string;
  aisleId: string;
  tags?: string[];
}

export interface Aisle {
  id: string;
  name: string;
  svgCoordinates: { x: number; y: number };
}

export const aisles: Aisle[] = [
  { id: 'entrance', name: 'Entrance', svgCoordinates: { x: 50, y: 350 } },
  { id: 'aisle-produce', name: 'Fresh Produce', svgCoordinates: { x: 150, y: 100 } },
  { id: 'aisle-dairy', name: 'Dairy & Eggs', svgCoordinates: { x: 300, y: 100 } },
  { id: 'aisle-bakery', name: 'Bakery', svgCoordinates: { x: 450, y: 100 } },
  { id: 'aisle-meat', name: 'Meat & Seafood', svgCoordinates: { x: 150, y: 250 } },
  { id: 'checkout', name: 'Checkout', svgCoordinates: { x: 500, y: 350 } },
];

export const mockProducts: Product[] = [
  // Produce
  { id: 'p1',  name: 'Italian Avocado',     price: 6.50,  category: 'Produce', weight: '500 gm',  imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-produce', tags: ['fruit','fresh'] },
  { id: 'p2',  name: 'Organic Bananas',     price: 2.99,  category: 'Produce', weight: '1 kg',    imageUrl: 'https://images.unsplash.com/photo-1571501478200-85f81ce723ee?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-produce', tags: ['fruit','fresh'] },
  { id: 'p7',  name: 'Cherry Tomatoes',     price: 3.79,  category: 'Produce', weight: '250 gm',  imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-produce', tags: ['vegetable','fresh'] },
  { id: 'p8',  name: 'Baby Spinach',        price: 2.49,  category: 'Produce', weight: '200 gm',  imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-produce', tags: ['vegetable','leafy'] },
  { id: 'p9',  name: 'Hass Avocado (3pk)',  price: 5.29,  category: 'Produce', weight: '3 pcs',   imageUrl: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-produce', tags: ['fruit','fresh'] },
  { id: 'p10', name: 'Red Grapes',          price: 4.99,  category: 'Produce', weight: '500 gm',  imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-produce', tags: ['fruit','fresh'] },

  // Dairy
  { id: 'p3',  name: 'Whole Milk',          price: 3.49,  category: 'Dairy',   weight: '1 Gallon', imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-dairy', tags: ['milk','organic'] },
  { id: 'p4',  name: 'Farm Fresh Eggs',     price: 5.99,  category: 'Dairy',   weight: '1 Dozen',  imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-dairy', tags: ['eggs'] },
  { id: 'p11', name: 'Greek Yogurt',        price: 4.29,  category: 'Dairy',   weight: '450 gm',   imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-dairy', tags: ['yogurt','protein'] },
  { id: 'p12', name: 'Cheddar Cheese Block',price: 6.99,  category: 'Dairy',   weight: '400 gm',   imageUrl: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-dairy', tags: ['cheese'] },
  { id: 'p13', name: 'Skimmed Milk',        price: 2.79,  category: 'Dairy',   weight: '1 Gallon', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-dairy', tags: ['milk','low-fat'] },

  // Bakery
  { id: 'p5',  name: 'Artisan Bread',       price: 4.50,  category: 'Bakery',  weight: '1 Loaf',   imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-bakery', tags: ['bread','artisan'] },
  { id: 'p14', name: 'Sourdough Loaf',      price: 5.99,  category: 'Bakery',  weight: '1 Loaf',   imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-bakery', tags: ['bread','sourdough'] },
  { id: 'p15', name: 'Blueberry Muffins',   price: 3.49,  category: 'Bakery',  weight: '4 pcs',    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-bakery', tags: ['muffin','sweet'] },
  { id: 'p16', name: 'Croissants',          price: 2.99,  category: 'Bakery',  weight: '2 pcs',    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-bakery', tags: ['pastry','french'] },
  { id: 'p17', name: 'Whole Wheat Bread',   price: 3.29,  category: 'Bakery',  weight: '1 Loaf',   imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-bakery', tags: ['bread','healthy'] },

  // Meat
  { id: 'p6',  name: 'Atlantic Salmon',     price: 12.99, category: 'Meat',    weight: '1 lb',     imageUrl: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-meat', tags: ['fish','seafood'] },
  { id: 'p18', name: 'Chicken Breast',      price: 8.49,  category: 'Meat',    weight: '1 lb',     imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d11d36?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-meat', tags: ['chicken','protein'] },
  { id: 'p19', name: 'Ground Beef (Lean)',  price: 9.99,  category: 'Meat',    weight: '1 lb',     imageUrl: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-meat', tags: ['beef','protein'] },
  { id: 'p20', name: 'Shrimp (Peeled)',     price: 14.99, category: 'Meat',    weight: '500 gm',   imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-meat', tags: ['seafood','shellfish'] },
  { id: 'p21', name: 'Pork Chops',         price: 7.29,  category: 'Meat',    weight: '1 lb',     imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-meat', tags: ['pork','protein'] },
];
