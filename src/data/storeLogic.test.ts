import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORIES_LIST,
  DEFAULT_BRAND_CONFIG,
  DESIGN_SYSTEM_COLORS,
  INITIAL_PRODUCTS,
  buildWhatsAppOrderMessage,
  calculateCartTotals,
  filterAndSortProducts,
  updateCartItemQuantity,
  validateBrandConfig,
  validateOrderInput,
} from './storeLogic';

test('default brand config is Uzvi Furniture with 8 categories and 20 products', () => {
  assert.equal(DEFAULT_BRAND_CONFIG.companyName, 'Uzvi Furniture');
  assert.equal(DEFAULT_BRAND_CONFIG.currencySymbol, '৳');
  assert.equal(CATEGORIES_LIST.length, 8);
  assert.equal(INITIAL_PRODUCTS.length, 20);

  const hexByName = Object.fromEntries(
    DESIGN_SYSTEM_COLORS.map((c) => [c.name, c.hex])
  );
  assert.equal(hexByName['Warm Cream'], '#F7F3ED');
  assert.equal(hexByName['Walnut Brown'], '#75472F');
  assert.equal(hexByName['Forest Green'], '#183D32');
  assert.equal(hexByName['Soft Gold'], '#D4A45B');
});

test('validateBrandConfig enforces non-empty company name and allows customization', () => {
  const emptyCheck = validateBrandConfig({ companyName: '   ' });
  assert.equal(emptyCheck.valid, false);

  const customCheck = validateBrandConfig({
    companyName: 'UZVI Home & Living',
    heroTitle: 'Make Your Home More Beautiful',
    freeShippingThreshold: 20000,
  });
  assert.equal(customCheck.valid, true);
  assert.equal(customCheck.sanitized?.companyName, 'UZVI Home & Living');
  assert.equal(customCheck.sanitized?.freeShippingThreshold, 20000);
});

test('filterAndSortProducts filters by category, search query, and sorts by low/high/name', () => {
  const lamps = filterAndSortProducts(INITIAL_PRODUCTS, {
    category: 'Wooden Lamp',
    searchQuery: '',
    sortBy: 'featured',
  });
  assert.equal(lamps.length, 3);
  assert.ok(lamps.every((p) => p.category === 'Wooden Lamp'));

  const searchAlmira = filterAndSortProducts(INITIAL_PRODUCTS, {
    category: 'All',
    searchQuery: 'Two Door Wooden Almira',
    sortBy: 'featured',
  });
  assert.equal(searchAlmira.length, 1);
  assert.equal(searchAlmira[0].id, 'prod-8');

  const sortedLow = filterAndSortProducts(INITIAL_PRODUCTS, {
    category: 'All',
    searchQuery: '',
    sortBy: 'low',
  });
  assert.ok(sortedLow[0].price <= sortedLow[sortedLow.length - 1].price);

  const sortedName = filterAndSortProducts(INITIAL_PRODUCTS, {
    category: 'All',
    searchQuery: '',
    sortBy: 'name',
  });
  assert.ok(sortedName[0].name.localeCompare(sortedName[1].name) <= 0);
});

test('cart calculations and WhatsApp message builder format BDT orders accurately', () => {
  let cart = updateCartItemQuantity([], 'prod-1', 'Natural Walnut', 2);
  const summary = calculateCartTotals(cart, INITIAL_PRODUCTS, 25000);
  assert.equal(summary.subtotal, 13000);
  assert.equal(summary.totalItems, 2);

  const msg = buildWhatsAppOrderMessage('Uzvi Furniture', summary, '৳');
  assert.ok(msg.includes('Hello Uzvi Furniture, I want to order:'));
  assert.ok(msg.includes('Sculpted Wooden Floor Lamp x 2'));
});

test('validateOrderInput validates customer checkout details', () => {
  assert.equal(
    validateOrderInput({
      customerName: '',
      phone: '01711000000',
      address: 'Banani, Dhaka',
      postalCode: '1213',
    }).valid,
    false
  );

  assert.equal(
    validateOrderInput({
      customerName: 'Azizul Hakim',
      phone: '+8801711849200',
      address: 'House 42, Road 11, Banani, Dhaka',
      postalCode: '1213',
    }).valid,
    true
  );
});
