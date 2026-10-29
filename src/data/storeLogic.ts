export interface ColorToken {
  id: string;
  name: string;
  hex: string;
  bengaliLabel: string;
  englishRole: string;
}

export interface HeroSlide {
  img: string;
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  desc: string;
  btn: string;
  targetCategory?: 'All' | ProductCategory;
}

export interface BrandConfig {
  companyName: string;
  companySubtitle: string;
  topBannerText: string;
  heroTitle: string;
  heroSubtitle: string;
  craftHeading: string;
  freeShippingThreshold: number;
  currencySymbol: string;
  supportPhone: string;
  supportEmail: string;
  websiteUrl: string;
  showroomAddress: string;
  whatsappNumber?: string;
  whatsappWidgetEnabled?: boolean;
  whatsappGreeting?: string;
}

export type ProductCategory =
  | 'Wooden Lamp'
  | 'Almira'
  | 'Wardrobe'
  | 'Bed'
  | 'Sofa'
  | 'Table'
  | 'Chair'
  | 'Home Decor';

export interface CategoryInfo {
  name: ProductCategory;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  maker: string;
  category: ProductCategory;
  price: number;
  oldPrice: number;
  rating: number;
  material: string;
  dimensions: string;
  leadTime: string;
  inStock: boolean;
  featuredTag: string;
  image: string;
  description: string;
  woodFinishes: string[];
}

export interface CartItem {
  productId: string;
  woodFinish: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'COD' | 'WhatsApp';
  items: Array<{
    productId: string;
    productName: string;
    woodFinish: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Preparing Shipment' | 'In Transit' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export const DESIGN_SYSTEM_COLORS: ColorToken[] = [
  {
    id: 'warm-cream',
    name: 'Warm Cream',
    hex: '#F7F3ED',
    bengaliLabel: 'পেজের ব্যাকগ্রাউন্ড',
    englishRole: 'Section & Editorial Background (--cream)',
  },
  {
    id: 'walnut-brown',
    name: 'Walnut Brown',
    hex: '#75472F',
    bengaliLabel: 'কাঠের ফার্নিচার ও ব্র্যান্ডের অ্যাকসেন্ট',
    englishRole: 'Brand Wordmark & Timber Accents (--brown)',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    hex: '#183D32',
    bengaliLabel: 'বাটন ও প্রিমিয়াম ব্র্যান্ডিং',
    englishRole: 'Primary Buttons, Top Bar & Branding (--green)',
  },
  {
    id: 'soft-gold',
    name: 'Soft Gold',
    hex: '#D4A45B',
    bengaliLabel: 'সূক্ষ্ম হাইলাইট',
    englishRole: 'Kickers, Gold CTAs & Subtle Highlights (--gold)',
  },
];

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  companyName: 'Qatar Elite Decor',
  companySubtitle: 'LUXURY LIVING & BESPOKE INTERIORS',
  topBannerText: '✦ Qatar Elite Decor · Luxury Furniture & Bespoke Interiors · Worldwide Delivery',
  heroTitle: 'Make Your Space Extraordinary',
  heroSubtitle:
    'Thoughtfully curated luxury furniture and timeless details for a home that embodies prestige.',
  craftHeading: 'Make Room for Elite Living',
  freeShippingThreshold: 25000,
  currencySymbol: '৳',
  supportPhone: '+880 1711-849200',
  supportEmail: 'care@qatarelitedecor.com',
  websiteUrl: 'qatarelitedecor.com',
  showroomAddress: 'Doha, Qatar',
  whatsappNumber: '+880 1711-849200',
  whatsappWidgetEnabled: true,
  whatsappGreeting: 'Hello! Welcome to Qatar Elite Decor. How may our concierge assist your luxury interior or bespoke furniture selection today?',
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    img: '/assets/uzvi/slide-1.jpg',
    kicker: 'Luxury Furniture & Home Decor',
    titleLine1: 'Make Your Home',
    titleLine2: 'More Beautiful',
    desc: 'Thoughtfully selected furniture and timeless details for a home that feels like you.',
    btn: 'Explore Collection →',
    targetCategory: 'All',
  },
  {
    img: '/assets/uzvi/slide-2.jpg',
    kicker: 'Comfort Meets Craftsmanship',
    titleLine1: 'Designed for',
    titleLine2: 'Everyday Living',
    desc: 'Discover elegant sofas, beds and statement pieces that bring warmth to every room.',
    btn: 'Shop Furniture →',
    targetCategory: 'Sofa',
  },
  {
    img: '/assets/uzvi/slide-3.jpg',
    kicker: 'Small Details. Big Difference.',
    titleLine1: 'Bring Home',
    titleLine2: 'Warm Elegance',
    desc: 'Wooden lamps, decorative accents and beautiful essentials for your favourite spaces.',
    btn: 'Discover Home Decor →',
    targetCategory: 'Wooden Lamp',
  },
];

export const CATEGORIES_LIST: CategoryInfo[] = [
  { name: 'Wooden Lamp', image: '/assets/uzvi/wooden-lamp.jpg' },
  { name: 'Almira', image: '/assets/uzvi/wardrobe.jpg' },
  { name: 'Wardrobe', image: '/assets/uzvi/almira.jpg' },
  { name: 'Bed', image: '/assets/uzvi/bed.jpg' },
  { name: 'Sofa', image: '/assets/uzvi/sofa.jpg' },
  { name: 'Table', image: '/assets/uzvi/cat-table.jpg' },
  { name: 'Chair', image: '/assets/uzvi/chair.jpg' },
  { name: 'Home Decor', image: '/assets/uzvi/home-decor.jpg' },
];

export const PROMO_COLLECTIONS: Array<{
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: 'All' | ProductCategory;
}> = [
  {
    id: 'promo-new',
    title: 'New Arrivals',
    subtitle: 'Fresh ideas for a beautiful home.',
    image: '/assets/uzvi/chair.jpg',
    category: 'All',
  },
  {
    id: 'promo-lamps',
    title: 'Wooden Lamps',
    subtitle: 'Light up your favourite corner.',
    image: '/assets/uzvi/wooden-lamp.jpg',
    category: 'Wooden Lamp',
  },
  {
    id: 'promo-bedrooms',
    title: 'Modern Bedrooms',
    subtitle: 'Comfort meets quiet luxury.',
    image: '/assets/uzvi/promo-bedroom.jpg',
    category: 'Bed',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Sculpted Wooden Floor Lamp',
    maker: 'Qatar Elite Studio',
    category: 'Wooden Lamp',
    price: 6500,
    oldPrice: 7800,
    rating: 4.8,
    material: 'Hand-Turned Teak & Warm Linen Shade',
    dimensions: '42 × 42 × 152 cm',
    leadTime: 'Delivery in 2–4 days',
    inStock: true,
    featuredTag: 'Bestseller',
    image: '/assets/uzvi/wooden-lamp.jpg',
    description:
      'Sculpted solid timber column floor lamp casting a warm ambient glow across living rooms and reading corners.',
    woodFinishes: ['Natural Walnut', 'Warm Teak', 'Smoked Oak'],
  },
  {
    id: 'prod-2',
    name: 'Classic Walnut Wardrobe',
    maker: 'Qatar Elite Studio',
    category: 'Wardrobe',
    price: 22000,
    oldPrice: 25500,
    rating: 4.8,
    material: 'Seasoned Walnut Timber & Brass Hardware',
    dimensions: '120 × 58 × 200 cm',
    leadTime: 'Delivery in 4–6 days',
    inStock: true,
    featuredTag: 'Popular',
    image: '/assets/uzvi/wardrobe.jpg',
    description:
      'Full-height wardrobe with adjustable solid wood shelves, hanging rail, and soft-close joinery.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-3',
    name: 'Forest Green Lounge Sofa',
    maker: 'Qatar Elite Studio',
    category: 'Sofa',
    price: 35000,
    oldPrice: 39000,
    rating: 4.9,
    material: 'Forest Green Velvet & Kiln-Dried Hardwood Frame',
    dimensions: '218 × 92 × 80 cm',
    leadTime: 'Delivery in 3–5 days',
    inStock: true,
    featuredTag: "Editor's Pick",
    image: '/assets/uzvi/sofa.jpg',
    description:
      'Signature deep-seated three-seater sofa upholstered in rich Forest Green fabric with tapered solid wood legs.',
    woodFinishes: ['Natural Walnut', 'Smoked Oak'],
  },
  {
    id: 'prod-4',
    name: 'Solid Wood Dining Table',
    maker: 'Qatar Elite Studio',
    category: 'Table',
    price: 28000,
    oldPrice: 32000,
    rating: 4.8,
    material: 'Solid Chittagong Teak & Natural Oil Finish',
    dimensions: '180 × 90 × 76 cm',
    leadTime: 'Delivery in 4–6 days',
    inStock: true,
    featuredTag: 'New',
    image: '/assets/uzvi/dining-table.jpg',
    description:
      'Six-seater solid wood dining table featuring bevelled edges and traditional mortise-and-tenon legs.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-5',
    name: 'Modern King Size Bed',
    maker: 'Qatar Elite Studio',
    category: 'Bed',
    price: 32000,
    oldPrice: 36500,
    rating: 4.9,
    material: 'Solid Walnut Frame & Upholstered Headboard',
    dimensions: '208 × 192 × 105 cm',
    leadTime: 'Delivery in 5–7 days',
    inStock: true,
    featuredTag: 'Bestseller',
    image: '/assets/uzvi/bed.jpg',
    description:
      'Architectural king size platform bed crafted for quiet luxury and lasting structural support.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-6',
    name: 'Decorative Home Vase',
    maker: 'UZVI Decor',
    category: 'Home Decor',
    price: 2500,
    oldPrice: 3100,
    rating: 4.8,
    material: 'Hand-Glazed Matte Ceramic',
    dimensions: '18 × 18 × 32 cm',
    leadTime: 'Delivery in 1–3 days',
    inStock: true,
    featuredTag: 'Popular',
    image: '/assets/uzvi/home-decor.jpg',
    description:
      'Minimalist artisan ceramic vessel designed for dried botanicals and console styling.',
    woodFinishes: ['Warm Cream Glaze', 'Terracotta Earth'],
  },
  {
    id: 'prod-7',
    name: 'Carved Wooden Table Lamp',
    maker: 'Qatar Elite Studio',
    category: 'Wooden Lamp',
    price: 4200,
    oldPrice: 5000,
    rating: 4.8,
    material: 'Hand-Carved Walnut Base & Cotton Shade',
    dimensions: '30 × 30 × 48 cm',
    leadTime: 'Delivery in 2–3 days',
    inStock: true,
    featuredTag: 'New',
    image: '/assets/uzvi/wooden-lamp.jpg',
    description:
      'Compact bedside and desk lamp featuring hand-fluted wooden detailing and warm light diffusion.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-8',
    name: 'Two Door Wooden Almira',
    maker: 'Qatar Elite Studio',
    category: 'Almira',
    price: 18500,
    oldPrice: 21000,
    rating: 4.8,
    material: 'Solid Seasoned Timber & Soft Gold Handles',
    dimensions: '98 × 55 × 190 cm',
    leadTime: 'Delivery in 4–6 days',
    inStock: true,
    featuredTag: 'Good Choice',
    image: '/assets/uzvi/almira.jpg',
    description:
      'Classic two-door wooden almira with generous shelving and lockable internal drawer compartment.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-9',
    name: 'Minimal Accent Chair',
    maker: 'Qatar Elite Studio',
    category: 'Chair',
    price: 8500,
    oldPrice: 9900,
    rating: 4.8,
    material: 'Bentwood Walnut & Textured Linen',
    dimensions: '64 × 68 × 79 cm',
    leadTime: 'Delivery in 2–4 days',
    inStock: true,
    featuredTag: 'Popular',
    image: '/assets/uzvi/chair.jpg',
    description:
      'Ergonomic lounge accent chair with curved timber armrests and supportive foam cushioning.',
    woodFinishes: ['Natural Walnut', 'Smoked Oak'],
  },
  {
    id: 'prod-10',
    name: 'Round Side Table',
    maker: 'Qatar Elite Studio',
    category: 'Table',
    price: 6200,
    oldPrice: 7500,
    rating: 4.8,
    material: 'Solid Turned Walnut',
    dimensions: '50 × 50 × 52 cm',
    leadTime: 'Delivery in 2–4 days',
    inStock: true,
    featuredTag: 'New',
    image: '/assets/uzvi/side-table.jpg',
    description:
      'Versatile round accent table ideal beside sofas, armchairs, or bedroom reading nooks.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-11',
    name: 'Three Door Wardrobe',
    maker: 'Qatar Elite Studio',
    category: 'Wardrobe',
    price: 29500,
    oldPrice: 33500,
    rating: 4.9,
    material: 'Premium Walnut Veneer & Solid Hardwood',
    dimensions: '165 × 60 × 205 cm',
    leadTime: 'Delivery in 5–7 days',
    inStock: true,
    featuredTag: 'Premium',
    image: '/assets/uzvi/wardrobe.jpg',
    description:
      'Spacious three-door family wardrobe with dual hanging bays and organize-ready linen shelves.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-12',
    name: 'Neutral Three Seater Sofa',
    maker: 'Qatar Elite Studio',
    category: 'Sofa',
    price: 42000,
    oldPrice: 47000,
    rating: 4.9,
    material: 'Warm Cream Bouclé & Solid Oak Plinth',
    dimensions: '232 × 95 × 78 cm',
    leadTime: 'Delivery in 4–6 days',
    inStock: true,
    featuredTag: 'Premium',
    image: '/assets/uzvi/slide-1.jpg',
    description:
      'Statement Warm Cream three-seater sofa crafted for calm, sunlit modern living rooms.',
    woodFinishes: ['Natural Walnut', 'Whitewashed Oak'],
  },
  {
    id: 'prod-13',
    name: 'Compact Single Bed',
    maker: 'Qatar Elite Studio',
    category: 'Bed',
    price: 19500,
    oldPrice: 22500,
    rating: 4.8,
    material: 'Solid Hardwood & Slatted Support Base',
    dimensions: '200 × 105 × 95 cm',
    leadTime: 'Delivery in 3–5 days',
    inStock: true,
    featuredTag: 'Space Saver',
    image: '/assets/uzvi/bed.jpg',
    description:
      'Clean-lined single bed engineered for guest rooms, studies, and compact urban apartments.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-14',
    name: 'Wooden Candle Holder Set',
    maker: 'UZVI Decor',
    category: 'Home Decor',
    price: 1800,
    oldPrice: 2300,
    rating: 4.8,
    material: 'Hand-Turned Walnut & Brass Inserts',
    dimensions: 'Set of 3 (12, 16, 22 cm)',
    leadTime: 'Delivery in 1–3 days',
    inStock: true,
    featuredTag: 'Gift Idea',
    image: '/assets/uzvi/candle-holder.jpg',
    description:
      'Trio of lathe-turned solid walnut pillar candle holders finished in natural beeswax.',
    woodFinishes: ['Natural Walnut'],
  },
  {
    id: 'prod-15',
    name: 'Upholstered Dining Chair',
    maker: 'Qatar Elite Studio',
    category: 'Chair',
    price: 5600,
    oldPrice: 6800,
    rating: 4.8,
    material: 'Solid Teak Frame & Oatmeal Fabric Seat',
    dimensions: '52 × 54 × 81 cm',
    leadTime: 'Delivery in 2–4 days',
    inStock: true,
    featuredTag: 'Comfort Pick',
    image: '/assets/uzvi/chair.jpg',
    description:
      'Supportive dining chair with contoured timber backrest and stain-resistant woven seat pad.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-16',
    name: 'Walnut Bedside Table',
    maker: 'Qatar Elite Studio',
    category: 'Table',
    price: 7200,
    oldPrice: 8500,
    rating: 4.8,
    material: 'Solid Walnut & Soft-Close Drawer',
    dimensions: '48 × 42 × 55 cm',
    leadTime: 'Delivery in 2–4 days',
    inStock: true,
    featuredTag: 'Popular',
    image: '/assets/uzvi/side-table.jpg',
    description:
      'Compact nightstand with concealed storage drawer and open lower shelf for bedtime reading.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-17',
    name: 'Tall Display Cabinet',
    maker: 'Qatar Elite Studio',
    category: 'Almira',
    price: 24500,
    oldPrice: 27900,
    rating: 4.9,
    material: 'Solid Walnut & Tempered Fluted Glass',
    dimensions: '105 × 45 × 195 cm',
    leadTime: 'Delivery in 4–6 days',
    inStock: true,
    featuredTag: 'Statement Piece',
    image: '/assets/uzvi/almira.jpg',
    description:
      'Architectural showcase almira for ceramics, books, and heirloom tableware.',
    woodFinishes: ['Natural Walnut', 'Smoked Oak'],
  },
  {
    id: 'prod-18',
    name: 'Reading Corner Floor Lamp',
    maker: 'Qatar Elite Studio',
    category: 'Wooden Lamp',
    price: 5900,
    oldPrice: 6900,
    rating: 4.8,
    material: 'Angled Ash Timber & Linen Drum Shade',
    dimensions: '45 × 45 × 148 cm',
    leadTime: 'Delivery in 2–4 days',
    inStock: true,
    featuredTag: 'Warm Glow',
    image: '/assets/uzvi/wooden-lamp.jpg',
    description:
      'Focused downward illumination with a slim wooden tripod silhouette for cozy reading nooks.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-19',
    name: 'Wooden Writing Desk',
    maker: 'Qatar Elite Studio',
    category: 'Table',
    price: 12500,
    oldPrice: 14900,
    rating: 4.8,
    material: 'Solid Walnut Top & Dual Utility Drawers',
    dimensions: '125 × 62 × 75 cm',
    leadTime: 'Delivery in 3–5 days',
    inStock: true,
    featuredTag: 'Work From Home',
    image: '/assets/uzvi/side-table.jpg',
    description:
      'Clean-proportioned study and home office desk with cable management channel and twin drawers.',
    woodFinishes: ['Natural Walnut', 'Warm Teak'],
  },
  {
    id: 'prod-20',
    name: 'Modern Accent Decor',
    maker: 'UZVI Decor',
    category: 'Home Decor',
    price: 1450,
    oldPrice: 1800,
    rating: 4.8,
    material: 'Sculpted Stoneware & Walnut Base',
    dimensions: '20 × 14 × 24 cm',
    leadTime: 'Delivery in 1–3 days',
    inStock: true,
    featuredTag: 'Finishing Touch',
    image: '/assets/uzvi/home-decor.jpg',
    description:
      'Hand-finished decorative centerpiece bringing organic texture to coffee tables and open shelving.',
    woodFinishes: ['Warm Cream', 'Natural Walnut'],
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'UZ-1041',
    customerName: 'Tariqul Islam',
    phone: '+880 1712-339104',
    address: 'Apartment 4B, Road 27, Dhanmondi, Dhaka',
    postalCode: '1209',
    paymentMethod: 'COD',
    items: [
      {
        productId: 'prod-3',
        productName: 'Forest Green Lounge Sofa',
        woodFinish: 'Natural Walnut',
        quantity: 1,
        unitPrice: 35000,
      },
      {
        productId: 'prod-1',
        productName: 'Sculpted Wooden Floor Lamp',
        woodFinish: 'Natural Walnut',
        quantity: 1,
        unitPrice: 6500,
      },
    ],
    subtotal: 41500,
    shippingFee: 0,
    total: 41500,
    status: 'In Transit',
    createdAt: '2026-10-27',
  },
];

export type SortOption = 'featured' | 'low' | 'high' | 'name';

export interface FilterOptions {
  category: 'All' | ProductCategory;
  searchQuery: string;
  sortBy: SortOption;
}

export function formatBDT(amount: number, symbol: string = '৳'): string {
  return `${symbol}${amount.toLocaleString('en-BD')}`;
}

export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  const query = options.searchQuery.trim().toLowerCase();

  const filtered = products.filter((item) => {
    const matchesCategory =
      options.category === 'All' || item.category === options.category;
    if (!matchesCategory) return false;

    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.featuredTag.toLowerCase().includes(query) ||
      item.material.toLowerCase().includes(query)
    );
  });

  if (options.sortBy === 'low') {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  if (options.sortBy === 'high') {
    return [...filtered].sort((a, b) => b.price - a.price);
  }
  if (options.sortBy === 'name') {
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }
  return filtered;
}

export interface CartSummary {
  detailedItems: Array<{
    product: Product;
    woodFinish: string;
    quantity: number;
    lineTotal: number;
  }>;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  amountToFreeShipping: number;
}

export function calculateCartTotals(
  cartItems: CartItem[],
  products: Product[],
  freeShippingThreshold: number = 25000
): CartSummary {
  const detailedItems: CartSummary['detailedItems'] = [];
  let totalItems = 0;
  let subtotal = 0;

  for (const item of cartItems) {
    if (item.quantity <= 0) continue;
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;

    const lineTotal = product.price * item.quantity;
    detailedItems.push({
      product,
      woodFinish: item.woodFinish,
      quantity: item.quantity,
      lineTotal,
    });
    totalItems += item.quantity;
    subtotal += lineTotal;
  }

  const shippingFee =
    subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 600;
  const total = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return {
    detailedItems,
    totalItems,
    subtotal,
    shippingFee,
    total,
    amountToFreeShipping,
  };
}

export function updateCartItemQuantity(
  cartItems: CartItem[],
  productId: string,
  woodFinish: string,
  delta: number
): CartItem[] {
  const existingIndex = cartItems.findIndex(
    (item) => item.productId === productId && item.woodFinish === woodFinish
  );

  if (existingIndex === -1) {
    if (delta > 0) {
      return [...cartItems, { productId, woodFinish, quantity: delta }];
    }
    return cartItems;
  }

  const updated = [...cartItems];
  const newQty = updated[existingIndex].quantity + delta;
  if (newQty <= 0) {
    updated.splice(existingIndex, 1);
  } else {
    updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
  }
  return updated;
}

export function buildWhatsAppOrderMessage(
  companyName: string,
  cartSummary: CartSummary,
  currencySymbol: string = '৳'
): string {
  const lines = cartSummary.detailedItems
    .map(
      (i) =>
        `${i.product.name} x ${i.quantity} = ${formatBDT(
          i.lineTotal,
          currencySymbol
        )}`
    )
    .join('\n');
  return `Hello ${companyName}, I want to order:\n${lines}\nSubtotal: ${formatBDT(
    cartSummary.subtotal,
    currencySymbol
  )}\nPlease confirm delivery and stock.`;
}

export interface OrderFormInput {
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
}

export function validateOrderInput(input: OrderFormInput): {
  valid: boolean;
  error?: string;
} {
  if (!input.customerName || input.customerName.trim().length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  if (!input.phone || input.phone.trim().length < 7) {
    return { valid: false, error: 'Please enter a valid contact phone number.' };
  }
  if (!input.address || input.address.trim().length < 5) {
    return { valid: false, error: 'Please enter a complete delivery address.' };
  }
  if (!input.postalCode || input.postalCode.trim().length < 3) {
    return { valid: false, error: 'Please enter your postal code or area code.' };
  }
  return { valid: true };
}

export function validateBrandConfig(input: Partial<BrandConfig>): {
  valid: boolean;
  sanitized?: BrandConfig;
  error?: string;
} {
  const companyName = (input.companyName ?? '').trim();
  if (!companyName) {
    return {
      valid: false,
      error: 'Company name cannot be empty.',
    };
  }

  const heroTitle = (input.heroTitle ?? DEFAULT_BRAND_CONFIG.heroTitle).trim();
  if (!heroTitle) {
    return {
      valid: false,
      error: 'Hero headline cannot be empty.',
    };
  }

  const threshold = Number(
    input.freeShippingThreshold ?? DEFAULT_BRAND_CONFIG.freeShippingThreshold
  );
  if (Number.isNaN(threshold) || threshold < 0) {
    return {
      valid: false,
      error: 'Free shipping threshold must be a positive number.',
    };
  }

  return {
    valid: true,
    sanitized: {
      companyName,
      companySubtitle:
        (input.companySubtitle ?? DEFAULT_BRAND_CONFIG.companySubtitle).trim() ||
        DEFAULT_BRAND_CONFIG.companySubtitle,
      topBannerText:
        (input.topBannerText ?? DEFAULT_BRAND_CONFIG.topBannerText).trim() ||
        DEFAULT_BRAND_CONFIG.topBannerText,
      heroTitle,
      heroSubtitle:
        (input.heroSubtitle ?? DEFAULT_BRAND_CONFIG.heroSubtitle).trim() ||
        DEFAULT_BRAND_CONFIG.heroSubtitle,
      craftHeading:
        (input.craftHeading ?? DEFAULT_BRAND_CONFIG.craftHeading).trim() ||
        DEFAULT_BRAND_CONFIG.craftHeading,
      freeShippingThreshold: threshold,
      currencySymbol:
        (input.currencySymbol ?? DEFAULT_BRAND_CONFIG.currencySymbol).trim() ||
        '৳',
      supportPhone:
        (input.supportPhone ?? DEFAULT_BRAND_CONFIG.supportPhone).trim() ||
        DEFAULT_BRAND_CONFIG.supportPhone,
      supportEmail:
        (input.supportEmail ?? DEFAULT_BRAND_CONFIG.supportEmail).trim() ||
        DEFAULT_BRAND_CONFIG.supportEmail,
      websiteUrl:
        (input.websiteUrl ?? DEFAULT_BRAND_CONFIG.websiteUrl).trim() ||
        DEFAULT_BRAND_CONFIG.websiteUrl,
      showroomAddress:
        (input.showroomAddress ?? DEFAULT_BRAND_CONFIG.showroomAddress).trim() ||
        DEFAULT_BRAND_CONFIG.showroomAddress,
    },
  };
}
