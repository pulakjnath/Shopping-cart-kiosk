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
  svgRect: { x: number; y: number; w: number; h: number };
  icon: string;
  color: string;
  category: keyof typeof categoryColors;
  isNavigable: boolean;
}

export const categoryColors = {
  fresh: '#c8e6c9',
  prepared: '#ffe0b2',
  dry: '#f5f5f5',
  general: '#e0e0e0',
};

export const aisles: Aisle[] = [
  {
    id: 'entrance',
    name: 'Entrance',
    svgCoordinates: { x: 90, y: 445 },
    svgRect: { x: 50, y: 390, w: 80, h: 110 },
    icon: 'ShoppingCart',
    color: '#9e9e9e',
    category: 'general',
    isNavigable: false,
  },
  {
    id: 'aisle-seafood',
    name: 'Seafood',
    svgCoordinates: { x: 115, y: 100 },
    svgRect: { x: 55, y: 50, w: 120, h: 120 },
    icon: 'Fish',
    color: '#29b6f6',
    category: 'fresh',
    isNavigable: true,
  },
  {
    id: 'aisle-cheese',
    name: 'Cheese',
    svgCoordinates: { x: 235, y: 80 },
    svgRect: { x: 183, y: 50, w: 100, h: 60 },
    icon: 'Package',
    color: '#ffd54f',
    category: 'dry',
    isNavigable: true,
  },
  {
    id: 'aisle-olive-bar',
    name: 'Olive Bar',
    svgCoordinates: { x: 312, y: 80 },
    svgRect: { x: 291, y: 50, w: 70, h: 60 },
    icon: 'Leaf',
    color: '#aed581',
    category: 'prepared',
    isNavigable: false,
  },
  {
    id: 'aisle-produce',
    name: 'Produce',
    svgCoordinates: { x: 145, y: 235 },
    svgRect: { x: 55, y: 175, w: 175, h: 120 },
    icon: 'Apple',
    color: '#4caf50',
    category: 'fresh',
    isNavigable: true,
  },
  {
    id: 'aisle-wine',
    name: 'Wine',
    svgCoordinates: { x: 453, y: 95 },
    svgRect: { x: 420, y: 50, w: 68, h: 90 },
    icon: 'Wine',
    color: '#ce93d8',
    category: 'dry',
    isNavigable: true,
  },
  {
    id: 'aisle-beer',
    name: 'Beer',
    svgCoordinates: { x: 530, y: 95 },
    svgRect: { x: 498, y: 50, w: 68, h: 90 },
    icon: 'Beer',
    color: '#ffcc02',
    category: 'dry',
    isNavigable: true,
  },
  {
    id: 'aisle-meat',
    name: 'Meat',
    svgCoordinates: { x: 625, y: 100 },
    svgRect: { x: 574, y: 50, w: 120, h: 120 },
    icon: 'Beef',
    color: '#ef5350',
    category: 'fresh',
    isNavigable: true,
  },
  {
    id: 'aisle-dairy',
    name: 'Dairy',
    svgCoordinates: { x: 722, y: 150 },
    svgRect: { x: 700, y: 50, w: 55, h: 200 },
    icon: 'Milk',
    color: '#29b6f6',
    category: 'fresh',
    isNavigable: true,
  },
  {
    id: 'aisle-floral',
    name: 'Floral',
    svgCoordinates: { x: 275, y: 255 },
    svgRect: { x: 238, y: 215, w: 78, h: 90 },
    icon: 'Flower2',
    color: '#f48fb1',
    category: 'fresh',
    isNavigable: true,
  },
  {
    id: 'aisle-wholebody',
    name: 'Whole Body',
    svgCoordinates: { x: 363, y: 248 },
    svgRect: { x: 325, y: 200, w: 88, h: 105 },
    icon: 'Sparkles',
    color: '#80cbc4',
    category: 'prepared',
    isNavigable: true,
  },
  {
    id: 'aisle-bulk',
    name: 'Bulk Ingredients',
    svgCoordinates: { x: 500, y: 200 },
    svgRect: { x: 420, y: 152, w: 152, h: 68 },
    icon: 'Package',
    color: '#bcaaa4',
    category: 'dry',
    isNavigable: true,
  },
  {
    id: 'aisle-frozen',
    name: 'Frozen Foods',
    svgCoordinates: { x: 497, y: 268 },
    svgRect: { x: 420, y: 228, w: 152, h: 85 },
    icon: 'Snowflake',
    color: '#90caf9',
    category: 'dry',
    isNavigable: true,
  },
  {
    id: 'aisle-bakery',
    name: 'Bakery',
    svgCoordinates: { x: 660, y: 262 },
    svgRect: { x: 578, y: 178, w: 177, h: 140 },
    icon: 'Croissant',
    color: '#ff9800',
    category: 'prepared',
    isNavigable: true,
  },
  {
    id: 'aisle-coffee',
    name: 'Coffee',
    svgCoordinates: { x: 282, y: 382 },
    svgRect: { x: 238, y: 345, w: 82, h: 80 },
    icon: 'Coffee',
    color: '#a1887f',
    category: 'prepared',
    isNavigable: true,
  },
  {
    id: 'checkout',
    name: 'Check-Out',
    svgCoordinates: { x: 382, y: 388 },
    svgRect: { x: 330, y: 350, w: 85, h: 75 },
    icon: 'CreditCard',
    color: '#78909c',
    category: 'general',
    isNavigable: false,
  },
  {
    id: 'aisle-prepared',
    name: 'Prepared Fare',
    svgCoordinates: { x: 585, y: 470 },
    svgRect: { x: 420, y: 400, w: 335, h: 145 },
    icon: 'UtensilsCrossed',
    color: '#ff7043',
    category: 'prepared',
    isNavigable: true,
  },
];

export const mockProducts: Product[] = [
  // Produce
  { id: 'p1',  name: 'Italian Avocado',     price: 6.50,  category: 'Produce', weight: '500 gm',  imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-produce', tags: ['fruit','fresh'] },
  { id: 'p2',  name: 'Organic Bananas',     price: 2.99,  category: 'Produce', weight: '1 kg',    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-produce', tags: ['fruit','fresh'] },
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

  // Seafood
  { id: 's1',  name: 'Jumbo Prawns',     price: 18.99, category: 'Seafood', weight: '1 lb',     imageUrl: 'https://images.unsplash.com/photo-1510130113356-82b85a31afab?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-seafood', tags: ['seafood','shellfish'] },
  { id: 's2',  name: 'Tuna Steak',      price: 15.49,  category: 'Seafood', weight: '1 lb',     imageUrl: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-seafood', tags: ['fish','seafood'] },
  { id: 's3',  name: 'Lobster Tail',  price: 24.99,  category: 'Seafood', weight: '1 lb',     imageUrl: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-seafood', tags: ['seafood','shellfish'] },

  // Cheese
  { id: 'c1',  name: 'Brie Wheel',     price: 8.99, category: 'Cheese', weight: '200 gm',     imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-cheese', tags: ['cheese','dairy'] },
  { id: 'c2',  name: 'Gouda Block',      price: 7.49,  category: 'Cheese', weight: '250 gm',     imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-cheese', tags: ['cheese','dairy'] },
  { id: 'c3',  name: 'Parmesan Wedge',  price: 9.99,  category: 'Cheese', weight: '200 gm',     imageUrl: 'https://images.unsplash.com/photo-1589881133825-bbb3b9471b1b?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-cheese', tags: ['cheese','dairy'] },

  // Wine
  { id: 'w1',  name: 'Pinot Noir',     price: 19.99, category: 'Wine', weight: '750 ml',     imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-wine', tags: ['wine','alcohol'] },
  { id: 'w2',  name: 'Chardonnay',      price: 16.49,  category: 'Wine', weight: '750 ml',     imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-wine', tags: ['wine','alcohol'] },
  { id: 'w3',  name: 'Rosé Blend',  price: 14.99,  category: 'Wine', weight: '750 ml',     imageUrl: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-wine', tags: ['wine','alcohol'] },

  // Beer
  { id: 'b1',  name: 'Craft IPA 6-Pack',     price: 12.99, category: 'Beer', weight: '6x12 oz',     imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-beer', tags: ['beer','alcohol'] },
  { id: 'b2',  name: 'Lager 12-Pack',      price: 15.49,  category: 'Beer', weight: '12x12 oz',     imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-beer', tags: ['beer','alcohol'] },
  { id: 'b3',  name: 'Stout Can',  price: 3.99,  category: 'Beer', weight: '16 oz',     imageUrl: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-beer', tags: ['beer','alcohol'] },

  // Floral
  { id: 'f1',  name: 'Rose Bouquet',     price: 14.99, category: 'Floral', weight: '1 Bouquet',     imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-floral', tags: ['flowers','gift'] },
  { id: 'f2',  name: 'Sunflower Bunch',      price: 9.49,  category: 'Floral', weight: '1 Bunch',     imageUrl: 'https://images.unsplash.com/photo-1551731956-3e70472e80d4?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-floral', tags: ['flowers','gift'] },
  { id: 'f3',  name: 'Mixed Tulips',  price: 12.99,  category: 'Floral', weight: '1 Bouquet',     imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-floral', tags: ['flowers','gift'] },

  // Whole Body
  { id: 'wb1',  name: 'Lavender Soap',     price: 4.99, category: 'Whole Body', weight: '1 Bar',     imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-wholebody', tags: ['soap','beauty'] },
  { id: 'wb2',  name: 'Coconut Shampoo',      price: 8.49,  category: 'Whole Body', weight: '16 oz',     imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-wholebody', tags: ['shampoo','beauty'] },
  { id: 'wb3',  name: 'Body Lotion',  price: 9.99,  category: 'Whole Body', weight: '12 oz',     imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-wholebody', tags: ['lotion','beauty'] },

  // Bulk Ingredients
  { id: 'bi1',  name: 'Quinoa (2lb)',     price: 7.99, category: 'Bulk Ingredients', weight: '2 lb',     imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-bulk', tags: ['grains','healthy'] },
  { id: 'bi2',  name: 'Rolled Oats',      price: 4.49,  category: 'Bulk Ingredients', weight: '1.5 lb',     imageUrl: 'https://images.unsplash.com/photo-1614961233913-a5113e3d6b48?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-bulk', tags: ['grains','breakfast'] },
  { id: 'bi3',  name: 'Almonds (1lb)',  price: 8.99,  category: 'Bulk Ingredients', weight: '1 lb',     imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-bulk', tags: ['nuts','healthy'] },

  // Frozen Foods
  { id: 'ff1',  name: 'Frozen Pizza',     price: 6.99, category: 'Frozen Foods', weight: '1 Pizza',     imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-frozen', tags: ['pizza','frozen'] },
  { id: 'ff2',  name: 'Ice Cream Tub',      price: 5.49,  category: 'Frozen Foods', weight: '1 Pint',     imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-frozen', tags: ['dessert','frozen'] },
  { id: 'ff3',  name: 'Veggie Stir Fry',  price: 4.99,  category: 'Frozen Foods', weight: '16 oz',     imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-frozen', tags: ['vegetables','frozen'] },

  // Coffee
  { id: 'cf1',  name: 'Ethiopian Blend',     price: 12.99, category: 'Coffee', weight: '12 oz',     imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-coffee', tags: ['coffee','beans'] },
  { id: 'cf2',  name: 'French Roast',      price: 11.49,  category: 'Coffee', weight: '12 oz',     imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-coffee', tags: ['coffee','beans'] },
  { id: 'cf3',  name: 'Matcha Powder',  price: 14.99,  category: 'Coffee', weight: '4 oz',     imageUrl: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-coffee', tags: ['tea','powder'] },

  // Prepared Fare
  { id: 'pf1',  name: 'Caesar Salad Bowl',     price: 8.99, category: 'Prepared Fare', weight: '1 Bowl',     imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-prepared', tags: ['salad','lunch'] },
  { id: 'pf2',  name: 'Sushi Platter',      price: 14.49,  category: 'Prepared Fare', weight: '1 Platter',     imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-prepared', tags: ['sushi','lunch'] },
  { id: 'pf3',  name: 'Margherita Slice',  price: 3.99,  category: 'Prepared Fare', weight: '1 Slice',     imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400', aisleId: 'aisle-prepared', tags: ['pizza','lunch'] },
];
