import { Product, ProductContent } from "@/types";

// Helper to generate product contents with values
const createContent = (
  name: string,
  value: number,
  quantity: number = 1,
  description?: string,
): ProductContent => ({
  name,
  value,
  quantity,
  description,
});

export const products: Product[] = [
  {
    id: "1",
    name: "Cozy Night In Gift Box",
    slug: "cozy-night-in",
    description:
      "The perfect gift for someone who deserves a relaxing evening at home. This curated box includes premium candles, artisan chocolates, a plush throw blanket, and a bestselling novel. Create unforgettable memories of peaceful nights.",
    shortDescription: "Everything needed for the perfect cozy evening at home.",
    originalPrice: 119.99,
    salePrice: 89.99,
    images: [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600",
    ],
    category: "relaxation",
    occasion: ["birthday", "thank-you", "just-because"],
    recipient: ["for-her", "for-couples"],
    tags: ["bestseller", "cozy", "relaxation"],
    contents: [
      createContent(
        "Lavender Soy Candle",
        28,
        1,
        "Hand-poured, 60hr burn time",
      ),
      createContent("Belgian Dark Chocolates", 24, 1, "12-piece assortment"),
      createContent("Cashmere Blend Throw", 45, 1, "50x60 inches"),
      createContent("Bestselling Novel", 18, 1, "Curated fiction pick"),
      createContent("Herbal Tea Collection", 12, 1, "6 premium blends"),
    ],
    totalValue: 127,
    inStock: true,
    stockCount: 45,
    rating: 4.9,
    reviewCount: 328,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Gourmet Foodie Delight",
    slug: "gourmet-foodie-delight",
    description:
      "A culinary adventure in a box! Featuring artisan cheeses, premium olive oil, gourmet crackers, aged balsamic, and savory spreads. Perfect for food lovers who appreciate quality ingredients.",
    shortDescription: "Premium gourmet foods for the discerning palate.",
    originalPrice: 149.99,
    salePrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    ],
    category: "food-drink",
    occasion: ["anniversary", "thank-you", "holiday"],
    recipient: ["for-him", "for-her", "for-couples"],
    tags: ["gourmet", "food", "premium"],
    contents: [
      createContent("Aged Manchego Cheese", 32, 1, "6-month aged wheel"),
      createContent("Extra Virgin Olive Oil", 28, 1, "Cold-pressed, 500ml"),
      createContent("Artisan Crackers", 16, 2, "Sea salt & rosemary"),
      createContent("25-Year Balsamic", 35, 1, "Modena, Italy"),
      createContent("Fig & Walnut Spread", 14, 1, "8oz jar"),
      createContent("Marcona Almonds", 18, 1, "Rosemary roasted"),
    ],
    totalValue: 159,
    inStock: true,
    stockCount: 28,
    rating: 4.8,
    reviewCount: 156,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    id: "3",
    name: "Self-Care Sanctuary",
    slug: "self-care-sanctuary",
    description:
      "Transform any bathroom into a spa retreat. This luxurious box includes bath bombs, body butter, face masks, aromatherapy oils, and a silk sleep mask. The ultimate gift for relaxation and self-love.",
    shortDescription:
      "Luxurious spa essentials for the ultimate self-care experience.",
    originalPrice: 99.99,
    salePrice: 79.99,
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600",
    ],
    category: "beauty-wellness",
    occasion: ["birthday", "mothers-day", "just-because"],
    recipient: ["for-her"],
    tags: ["spa", "self-care", "wellness"],
    contents: [
      createContent("Lavender Bath Bombs", 24, 4, "Natural ingredients"),
      createContent("Shea Body Butter", 28, 1, "Whipped, unscented"),
      createContent("Clay Face Masks", 22, 3, "Rose, charcoal, honey"),
      createContent("Essential Oil Set", 35, 1, "Lavender, eucalyptus, mint"),
      createContent("Silk Sleep Mask", 18, 1, "100% mulberry silk"),
    ],
    totalValue: 127,
    inStock: true,
    stockCount: 62,
    rating: 4.9,
    reviewCount: 412,
    isBestseller: false,
    isNew: true,
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "4",
    name: "Adventure Awaits Box",
    slug: "adventure-awaits",
    description:
      "For the outdoor enthusiast and adventure seeker. Packed with travel essentials including a premium water bottle, portable speaker, trail snacks, and adventure journal. Inspire their next journey.",
    shortDescription: "Essential gear for outdoor enthusiasts and travelers.",
    originalPrice: 89.99,
    salePrice: 69.99,
    images: [
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600",
    ],
    category: "adventure",
    occasion: ["birthday", "graduation", "just-because"],
    recipient: ["for-him", "for-her"],
    tags: ["adventure", "outdoor", "travel"],
    contents: [
      createContent("Insulated Water Bottle", 35, 1, "32oz, keeps cold 24hrs"),
      createContent("Portable Bluetooth Speaker", 45, 1, "Waterproof"),
      createContent("Trail Mix Collection", 18, 3, "Premium nut blends"),
      createContent("Adventure Journal", 22, 1, "Leather-bound, waterproof"),
      createContent("Carabiner Keychain", 12, 1, "Multi-tool design"),
    ],
    totalValue: 132,
    inStock: true,
    stockCount: 34,
    rating: 4.7,
    reviewCount: 89,
    isBestseller: false,
    isNew: false,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "5",
    name: "New Parent Survival Kit",
    slug: "new-parent-survival",
    description:
      "A thoughtful gift for new parents navigating the beautiful chaos of parenthood. Includes comfort essentials for both baby and parents, plus treats to enjoy during those precious quiet moments.",
    shortDescription:
      "Essential comforts for new parents and their little one.",
    originalPrice: 109.99,
    salePrice: 88.99,
    images: [
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600",
    ],
    category: "new-parents",
    occasion: ["baby-shower", "thank-you"],
    recipient: ["for-couples", "new-parents"],
    tags: ["baby", "parents", "comfort"],
    contents: [
      createContent("Organic Baby Blanket", 38, 1, "Super soft muslin"),
      createContent("Parent Coffee Blend", 22, 1, "Extra-strong, fair trade"),
      createContent("Sleep Eye Mask", 16, 2, "For exhausted parents"),
      createContent("Baby-Safe Lotion", 18, 1, "Lavender, organic"),
      createContent("Snack Box", 15, 1, "Energy-boosting treats"),
    ],
    totalValue: 125,
    inStock: true,
    stockCount: 41,
    rating: 4.8,
    reviewCount: 203,
    isBestseller: false,
    isNew: true,
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "6",
    name: "Creative Arts Studio Box",
    slug: "creative-arts-studio",
    description:
      "Unleash creativity with this art-lover's dream box. Featuring premium watercolors, quality brushes, a sketchbook, and inspiring art prints. Perfect for artists of all skill levels.",
    shortDescription: "Premium art supplies for creative expression.",
    originalPrice: 79.99,
    salePrice: 59.99,
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
    ],
    category: "arts-crafts",
    occasion: ["birthday", "graduation", "just-because"],
    recipient: ["for-her", "creative"],
    tags: ["art", "creative", "crafts"],
    contents: [
      createContent("Watercolor Paint Set", 32, 1, "24 professional colors"),
      createContent("Artist Brush Set", 24, 1, "8-piece natural bristle"),
      createContent("Hardcover Sketchbook", 18, 1, "200 pages, archival paper"),
      createContent("Art Print Collection", 15, 3, "Inspiring prints"),
      createContent("Washi Tape Set", 12, 1, "Decorative patterns"),
    ],
    totalValue: 101,
    inStock: true,
    stockCount: 56,
    rating: 4.6,
    reviewCount: 134,
    isBestseller: false,
    isNew: false,
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "7",
    name: "Coffee Connoisseur Collection",
    slug: "coffee-connoisseur",
    description:
      "Elevate the morning ritual with this premium coffee experience. Features single-origin beans from three continents, a ceramic pour-over set, and artisan biscotti. For serious coffee lovers.",
    shortDescription: "Premium coffee beans and brewing essentials.",
    originalPrice: 94.99,
    salePrice: 74.99,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600",
    ],
    category: "food-drink",
    occasion: ["birthday", "thank-you", "holiday"],
    recipient: ["for-him", "for-her"],
    tags: ["coffee", "gourmet", "morning"],
    contents: [
      createContent("Ethiopian Yirgacheffe", 22, 1, "12oz whole bean"),
      createContent("Colombian Supremo", 20, 1, "12oz whole bean"),
      createContent("Sumatra Mandheling", 24, 1, "12oz whole bean"),
      createContent("Ceramic Pour-Over Set", 35, 1, "Minimalist design"),
      createContent("Almond Biscotti", 14, 1, "Artisan baked"),
    ],
    totalValue: 115,
    inStock: true,
    stockCount: 38,
    rating: 4.8,
    reviewCount: 267,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "8",
    name: "Book Lover's Paradise",
    slug: "book-lovers-paradise",
    description:
      "A literary escape for devoted readers. Includes a curated novel selection, bookmark collection, reading light, cozy socks, and gourmet tea. Perfect for those who live between the pages.",
    shortDescription:
      "Everything a book lover needs for the perfect reading session.",
    originalPrice: 84.99,
    salePrice: 64.99,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
    ],
    category: "books-reading",
    occasion: ["birthday", "thank-you", "holiday"],
    recipient: ["for-her", "for-him"],
    tags: ["books", "reading", "literary"],
    contents: [
      createContent("Curated Novel", 18, 2, "Current bestsellers"),
      createContent("Brass Bookmark Set", 16, 1, "5-piece collection"),
      createContent("Clip-On Reading Light", 22, 1, "Warm LED, rechargeable"),
      createContent("Reading Socks", 14, 1, "Super soft, cozy"),
      createContent("Earl Grey Tea", 12, 1, "Premium loose leaf"),
    ],
    totalValue: 100,
    inStock: true,
    stockCount: 47,
    rating: 4.7,
    reviewCount: 189,
    isBestseller: false,
    isNew: false,
    createdAt: "2024-02-10T10:00:00Z",
  },
];

// Get all unique categories
export const categories = [...new Set(products.map((p) => p.category))];

// Get all unique occasions
export const occasions = [...new Set(products.flatMap((p) => p.occasion))];

// Get all unique recipients
export const recipients = [...new Set(products.flatMap((p) => p.recipient))];

// Helper functions
export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category);

export const getBestsellers = (): Product[] =>
  products.filter((p) => p.isBestseller);

export const getNewArrivals = (): Product[] => products.filter((p) => p.isNew);

export const getProductsUnderPrice = (price: number): Product[] =>
  products.filter((p) => p.salePrice <= price);
