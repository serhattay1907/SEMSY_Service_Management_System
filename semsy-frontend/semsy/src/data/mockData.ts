import type { Product } from "@/types";

export const mockProducts: Product[] = [
  // === COFFEE — Classic world coffees & espresso variants ===
  {
    id: "p-001",
    name: "Espresso",
    nameEn: "Espresso",
    description:
      "Tek shot, yoğun ve kremalı. Sabahların klasik başlangıcı.",
    descriptionEn:
      "Single shot, intense and creamy. The classic morning starter.",
    price: 65,
    category: "coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80",
    isActive: true,
    stock: 99,
    recipe: [],
  },
  {
    id: "p-002",
    name: "Americano",
    nameEn: "Americano",
    description:
      "İki shot espresso ve sıcak su. Sade, derin, sakin.",
    descriptionEn:
      "Two espresso shots topped with hot water. Clean, deep, calm.",
    price: 85,
    category: "coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1503481766315-7a586b20f66d?w=600&q=80",
    isActive: true,
    stock: 99,
    recipe: [],
  },
  {
    id: "p-003",
    name: "Cappuccino",
    nameEn: "Cappuccino",
    description:
      "Eşit oranda espresso, süt ve süt köpüğü. Klasik İtalyan dengesi.",
    descriptionEn:
      "Equal parts espresso, steamed milk and foam. The Italian balance.",
    price: 95,
    category: "coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    isActive: true,
    stock: 99,
    recipe: [],
  },
  {
    id: "p-004",
    name: "Latte",
    nameEn: "Latte",
    description:
      "Bol sütlü, yumuşak ve sıcacık. Espresso'nun en samimi hali.",
    descriptionEn:
      "Milk-forward, soft and warming. Espresso at its friendliest.",
    price: 95,
    category: "coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80",
    isActive: true,
    stock: 99,
    recipe: [],
  },
  {
    id: "p-005",
    name: "Flat White",
    nameEn: "Flat White",
    description:
      "Daha az köpük, daha çok kremamsı süt. Avustralya usulü.",
    descriptionEn:
      "Less foam, more velvety milk. Australian-style espresso drink.",
    price: 105,
    category: "coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&q=80",
    isActive: true,
    stock: 99,
    recipe: [],
  },
  {
    id: "p-006",
    name: "Mocha",
    nameEn: "Mocha",
    description:
      "Espresso, bitter çikolata ve süt. Tatlıya yakın bir kahve.",
    descriptionEn:
      "Espresso with dark chocolate and milk. A coffee that flirts with dessert.",
    price: 115,
    category: "coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?w=600&q=80",
    isActive: true,
    stock: 8,
    recipe: [],
  },
  {
    id: "p-007",
    name: "Türk Kahvesi",
    nameEn: "Turkish Coffee",
    description:
      "Cezvede pişirilmiş, lokumla servis edilen geleneksel kahve.",
    descriptionEn:
      "Brewed in a cezve, served with Turkish delight on the side.",
    price: 75,
    category: "coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=600&q=80",
    isActive: true,
    stock: 99,
    recipe: [],
  },
  {
    id: "p-008",
    name: "Cortado",
    nameEn: "Cortado",
    description:
      "Eşit ölçüde espresso ve dokunmuş süt. Küçük ama tam.",
    descriptionEn:
      "Equal parts espresso and steamed milk. Small but complete.",
    price: 90,
    category: "coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80",
    isActive: true,
    stock: 0,
    recipe: [],
  },

  // === DRINKS — Tea, smoothies, cold ===
  {
    id: "p-009",
    name: "Demli Çay",
    nameEn: "Brewed Tea",
    description:
      "Çaydanlıkta demlenmiş, ince belli bardakta servis edilir.",
    descriptionEn:
      "Brewed in a samovar-style pot, served in a tulip glass.",
    price: 30,
    category: "drink",
    imageUrl:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80",
    isActive: true,
    stock: 99,
    recipe: [],
  },
  {
    id: "p-010",
    name: "Çilek-Muz Smoothie",
    nameEn: "Strawberry-Banana Smoothie",
    description:
      "Taze çilek, olgun muz ve yoğurt. Buzlu, ferahlatıcı.",
    descriptionEn:
      "Fresh strawberries, ripe banana and yogurt. Iced and refreshing.",
    price: 125,
    category: "drink",
    imageUrl:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&q=80",
    isActive: true,
    stock: 12,
    recipe: [],
  },
  {
    id: "p-011",
    name: "Limonata",
    nameEn: "Lemonade",
    description:
      "Taze sıkılmış limon, nane yaprakları, bir tutam bal.",
    descriptionEn:
      "Fresh-squeezed lemon, mint leaves, a touch of honey.",
    price: 75,
    category: "drink",
    imageUrl:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80",
    isActive: true,
    stock: 99,
    recipe: [],
  },
  {
    id: "p-012",
    name: "Soğuk Demleme",
    nameEn: "Cold Brew",
    description:
      "12 saat boyunca soğukta demlenmiş Etiyopya çekirdeği.",
    descriptionEn:
      "Ethiopian beans steeped cold for 12 hours. Smooth and bright.",
    price: 95,
    category: "drink",
    imageUrl:
      "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=600&q=80",
    isActive: true,
    stock: 6,
    recipe: [],
  },

  // === FOOD — Tost, sandviç, kahvaltı ===
  {
    id: "p-013",
    name: "Klasik Kaşarlı Tost",
    nameEn: "Classic Cheese Toast",
    description:
      "Köy ekmeği arasında bol kaşar, az sucuk. Yanında turşu.",
    descriptionEn:
      "Country bread with melted kaşar cheese and sujuk. Pickle on the side.",
    price: 145,
    category: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80",
    isActive: true,
    stock: 25,
    recipe: [],
  },
  {
    id: "p-014",
    name: "Avokadolu Tost",
    nameEn: "Avocado Toast",
    description:
      "Ezilmiş avokado, kiraz domates, çörek otu, çıtır ekmek üzerinde.",
    descriptionEn:
      "Smashed avocado, cherry tomato, nigella seed on toasted sourdough.",
    price: 165,
    category: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1603046891744-1f76eb10aec9?w=600&q=80",
    isActive: true,
    stock: 18,
    recipe: [],
  },
  {
    id: "p-015",
    name: "Köy Kahvaltı Tabağı",
    nameEn: "Village Breakfast Plate",
    description:
      "Tulum peyniri, zeytin, domates, salatalık, bal-kaymak, yumurta.",
    descriptionEn:
      "Tulum cheese, olives, tomato, cucumber, honey-cream, eggs.",
    price: 285,
    category: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80",
    isActive: true,
    stock: 10,
    recipe: [],
  },

  // === DESSERT — Waffle, kek, tatlı ===
  {
    id: "p-016",
    name: "Belçika Waffle",
    nameEn: "Belgian Waffle",
    description:
      "Çıtır waffle, çikolata sosu, taze meyveler, dondurma topu.",
    descriptionEn:
      "Crispy waffle with chocolate sauce, fresh fruit, scoop of ice cream.",
    price: 175,
    category: "dessert",
    imageUrl:
      "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80",
    isActive: true,
    stock: 14,
    recipe: [],
  },
  {
    id: "p-017",
    name: "Cheesecake",
    nameEn: "Cheesecake",
    description:
      "New York usulü, frambuaz sosu üzerinde. Bisküvi tabanı çıtır.",
    descriptionEn:
      "New York style with raspberry coulis. Crisp biscuit base.",
    price: 145,
    category: "dessert",
    imageUrl:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80",
    isActive: true,
    stock: 7,
    recipe: [],
  },
  {
    id: "p-018",
    name: "San Sebastian",
    nameEn: "Basque Cheesecake",
    description:
      "Bask usulü yanık peynirli kek. Karamelize, kremamsı.",
    descriptionEn:
      "Burnt Basque-style cheesecake. Caramelized top, creamy center.",
    price: 155,
    category: "dessert",
    imageUrl:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    isActive: true,
    stock: 0,
    recipe: [],
  },
];
