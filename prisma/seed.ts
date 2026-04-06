import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"]! });
const prisma = new PrismaClient({ adapter });

const categories = [
  {
    name: "Mobilier",
    slug: "mobilier",
    description: "Mobilier modern și confortabil pentru întreaga casă",
    imageUrl: "https://picsum.photos/seed/mobilier/600/600",
    children: [
      { name: "Canapele și Fotolii", slug: "canapele-fotolii", description: "Canapele, fotolii și colțare pentru living" },
      { name: "Mese și Scaune", slug: "mese-scaune", description: "Mese de dining, birouri și scaune" },
      { name: "Dulapuri și Comode", slug: "dulapuri-comode", description: "Soluții de depozitare pentru dormitor și hol" },
    ],
  },
  {
    name: "Decorațiuni",
    slug: "decoratiuni",
    description: "Decorațiuni interioare pentru un ambient deosebit",
    imageUrl: "https://picsum.photos/seed/decoratiuni/600/600",
    children: [
      { name: "Tablouri și Postere", slug: "tablouri-postere", description: "Artă și decorațiuni de perete" },
      { name: "Vaze și Ghivece", slug: "vaze-ghivece", description: "Vaze decorative și ghivece pentru plante" },
      { name: "Oglinzi", slug: "oglinzi", description: "Oglinzi decorative și funcționale" },
    ],
  },
  {
    name: "Iluminat",
    slug: "iluminat",
    description: "Corpuri de iluminat pentru fiecare cameră",
    imageUrl: "https://picsum.photos/seed/iluminat/600/600",
    children: [
      { name: "Lustre și Plafoniere", slug: "lustre-plafoniere", description: "Iluminat central pentru living și dormitor" },
      { name: "Lămpi de Masă", slug: "lampi-masa", description: "Lămpi de birou și noptieră" },
      { name: "Lămpi de Podea", slug: "lampi-podea", description: "Lampadare și lămpi de podea" },
    ],
  },
  {
    name: "Textile",
    slug: "textile",
    description: "Textile de casă pentru confort și stil",
    imageUrl: "https://picsum.photos/seed/textile-casa/600/600",
    children: [
      { name: "Perne și Pături", slug: "perne-paturi", description: "Perne decorative și pături moi" },
      { name: "Covoare", slug: "covoare", description: "Covoare și carpete pentru orice cameră" },
      { name: "Perdele și Draperii", slug: "perdele-draperii", description: "Perdele, draperii și jaluzele" },
    ],
  },
  {
    name: "Organizare",
    slug: "organizare",
    description: "Soluții inteligente de organizare a spațiului",
    imageUrl: "https://picsum.photos/seed/organizare/600/600",
    children: [
      { name: "Rafturi", slug: "rafturi", description: "Rafturi de perete și etajere" },
      { name: "Cutii și Coșuri", slug: "cutii-cosuri", description: "Cutii de depozitare și coșuri decorative" },
      { name: "Cuiere și Suporturi", slug: "cuiere-suporturi", description: "Cuiere, suporturi și organizatoare" },
    ],
  },
  {
    name: "Pets",
    slug: "pets",
    description: "Produse pentru animalul tău de companie",
    imageUrl: "https://picsum.photos/seed/pets/600/600",
    children: [
      { name: "Câini", slug: "caini", description: "Hrană, accesorii și jucării pentru câini" },
      { name: "Pisici", slug: "pisici", description: "Hrană, accesorii și jucării pentru pisici" },
      { name: "Hrană Animale", slug: "hrana-animale", description: "Hrană premium pentru toate animalele" },
      { name: "Accesorii Animale", slug: "accesorii-animale", description: "Accesorii, lese, zgărzi și jucării" },
    ],
  },
];

interface SeedProduct {
  name: string; slug: string; price: number; salePrice: number | null;
  sku: string; stock: number; catSlug: string; weight: number;
  isBestseller?: boolean; isTrending?: boolean; isRecommended?: boolean;
}

const products: SeedProduct[] = [
  { name: "Canapea Extensibilă Nordic", slug: "canapea-extensibila-nordic", price: 2490.00, salePrice: 2190.00, sku: "CN-001", stock: 8, catSlug: "canapele-fotolii", weight: 45, isBestseller: true },
  { name: "Fotoliu Relaxare Oslo", slug: "fotoliu-relaxare-oslo", price: 1290.00, salePrice: null, sku: "FO-002", stock: 12, catSlug: "canapele-fotolii", weight: 22, isRecommended: true },
  { name: "Masă Dining Lemn Stejar", slug: "masa-dining-lemn-stejar", price: 1890.00, salePrice: 1650.00, sku: "MD-003", stock: 5, catSlug: "mese-scaune", weight: 35, isBestseller: true },
  { name: "Set 4 Scaune Velvet", slug: "set-4-scaune-velvet", price: 1560.00, salePrice: null, sku: "SS-004", stock: 15, catSlug: "mese-scaune", weight: 24, isTrending: true },
  { name: "Dulap Dormitor 3 Uși", slug: "dulap-dormitor-3-usi", price: 2890.00, salePrice: 2490.00, sku: "DD-005", stock: 3, catSlug: "dulapuri-comode", weight: 80, isBestseller: true },
  { name: "Comodă TV Minimalistă", slug: "comoda-tv-minimalista", price: 890.00, salePrice: null, sku: "CT-006", stock: 20, catSlug: "dulapuri-comode", weight: 28, isRecommended: true },
  { name: "Tablou Canvas Abstract", slug: "tablou-canvas-abstract", price: 189.00, salePrice: 149.00, sku: "TC-007", stock: 35, catSlug: "tablouri-postere", weight: 1.5, isTrending: true },
  { name: "Set 3 Postere Botanice", slug: "set-3-postere-botanice", price: 129.00, salePrice: null, sku: "SP-008", stock: 40, catSlug: "tablouri-postere", weight: 0.8, isRecommended: true },
  { name: "Vază Ceramică Artizanală", slug: "vaza-ceramica-artizanala", price: 159.00, salePrice: null, sku: "VC-009", stock: 25, catSlug: "vaze-ghivece", weight: 2, isTrending: true },
  { name: "Oglindă Rotundă Aurie", slug: "oglinda-rotunda-aurie", price: 349.00, salePrice: 299.00, sku: "OR-010", stock: 10, catSlug: "oglinzi", weight: 5, isBestseller: true },
  { name: "Lustră LED Cristal Modern", slug: "lustra-led-cristal-modern", price: 890.00, salePrice: null, sku: "LC-011", stock: 6, catSlug: "lustre-plafoniere", weight: 8, isRecommended: true },
  { name: "Lampă Masă Nordică", slug: "lampa-masa-nordica", price: 229.00, salePrice: 189.00, sku: "LM-012", stock: 30, catSlug: "lampi-masa", weight: 2.5, isTrending: true },
  { name: "Lampadar Arc Negru", slug: "lampadar-arc-negru", price: 449.00, salePrice: null, sku: "LA-013", stock: 14, catSlug: "lampi-podea", weight: 6 },
  { name: "Set 4 Perne Decorative", slug: "set-4-perne-decorative", price: 199.00, salePrice: 169.00, sku: "PD-014", stock: 45, catSlug: "perne-paturi", weight: 2, isBestseller: true },
  { name: "Pătură Fleece Premium", slug: "patura-fleece-premium", price: 149.00, salePrice: null, sku: "PF-015", stock: 50, catSlug: "perne-paturi", weight: 1.5 },
  { name: "Covor Shaggy 160x230", slug: "covor-shaggy-160x230", price: 590.00, salePrice: 490.00, sku: "CS-016", stock: 18, catSlug: "covoare", weight: 12, isBestseller: true },
  { name: "Perdele Voal Alb Set", slug: "perdele-voal-alb-set", price: 189.00, salePrice: null, sku: "PV-017", stock: 22, catSlug: "perdele-draperii", weight: 1.2 },
  { name: "Raft Perete Industrial", slug: "raft-perete-industrial", price: 259.00, salePrice: 219.00, sku: "RP-018", stock: 28, catSlug: "rafturi", weight: 5, isTrending: true },
  { name: "Set 3 Coșuri Răchită", slug: "set-3-cosuri-rachita", price: 179.00, salePrice: null, sku: "CR-019", stock: 35, catSlug: "cutii-cosuri", weight: 3 },
  { name: "Cuier Perete 5 Cârlige", slug: "cuier-perete-5-carlige", price: 119.00, salePrice: 99.00, sku: "CP-020", stock: 40, catSlug: "cuiere-suporturi", weight: 1.8 },
  // Pets products
  { name: "Hrană Câini Premium 10kg", slug: "hrana-caini-premium-10kg", price: 189.00, salePrice: 159.00, sku: "PET-001", stock: 30, catSlug: "caini", weight: 10, isBestseller: true },
  { name: "Lesa Retractabilă 5m", slug: "lesa-retractabila-5m", price: 89.00, salePrice: null, sku: "PET-002", stock: 45, catSlug: "caini", weight: 0.5, isTrending: true },
  { name: "Pat Câine Ortopedic L", slug: "pat-caine-ortopedic-l", price: 249.00, salePrice: null, sku: "PET-003", stock: 15, catSlug: "caini", weight: 4, isRecommended: true },
  { name: "Hrană Pisici Indoor 4kg", slug: "hrana-pisici-indoor-4kg", price: 99.00, salePrice: 79.00, sku: "PET-004", stock: 50, catSlug: "pisici", weight: 4, isBestseller: true },
  { name: "Zgardă Pisici cu Clopoțel", slug: "zgarda-pisici-clopotel", price: 39.00, salePrice: null, sku: "PET-005", stock: 60, catSlug: "pisici", weight: 0.1, isTrending: true },
  { name: "Jucărie Interactivă Pisici", slug: "jucarie-interactiva-pisici", price: 59.00, salePrice: 49.00, sku: "PET-006", stock: 35, catSlug: "accesorii-animale", weight: 0.3, isRecommended: true },
  { name: "Nisip Pisici Premium 10L", slug: "nisip-pisici-premium-10l", price: 45.00, salePrice: null, sku: "PET-007", stock: 80, catSlug: "pisici", weight: 8, isBestseller: true },
  { name: "Bol Hrană Inox Dublu", slug: "bol-hrana-inox-dublu", price: 69.00, salePrice: 55.00, sku: "PET-008", stock: 40, catSlug: "accesorii-animale", weight: 0.8, isTrending: true },
];

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.shippingAddress.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();

  const passwordHash = await bcrypt.hash("Admin123!", 12);
  await prisma.user.create({
    data: {
      email: "admin@magazin.ro",
      passwordHash,
      name: "Administrator",
      role: "ADMIN",
    },
  });

  const categoryMap = new Map<string, string>();

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const parent = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        imageUrl: cat.imageUrl,
        sortOrder: i,
        isActive: true,
      },
    });
    categoryMap.set(cat.slug, parent.id);

    for (let j = 0; j < cat.children.length; j++) {
      const child = cat.children[j];
      const sub = await prisma.category.create({
        data: {
          name: child.name,
          slug: child.slug,
          description: child.description,
          imageUrl: `https://picsum.photos/seed/${child.slug}/600/600`,
          sortOrder: j,
          isActive: true,
          parentId: parent.id,
        },
      });
      categoryMap.set(child.slug, sub.id);
    }
  }

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const categoryId = categoryMap.get(p.catSlug);
    if (!categoryId) continue;

    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: `<p>${p.name} — produs de calitate superioară, realizat din materiale premium. Design modern ce se integrează perfect în orice ambient contemporan.</p><p>Greutate: ${p.weight} kg. Livrare cu montaj disponibilă.</p>`,
        price: p.price,
        salePrice: p.salePrice,
        sku: p.sku,
        stock: p.stock,
        weight: p.weight,
        status: "PUBLISHED",
        isBestseller: p.isBestseller ?? false,
        isTrending: p.isTrending ?? false,
        isRecommended: p.isRecommended ?? false,
        categoryId,
        images: {
          create: [
            { url: `https://picsum.photos/seed/${p.slug}-1/800/800`, alt: p.name, sortOrder: 0 },
            { url: `https://picsum.photos/seed/${p.slug}-2/800/800`, alt: `${p.name} detaliu`, sortOrder: 1 },
          ],
        },
      },
    });
  }

  const settings = [
    { key: "storeName", value: "JONO", group: "store" },
    { key: "storePhone", value: "+40 721 123 456", group: "store" },
    { key: "storeEmail", value: "contact@jono.ro", group: "store" },
    { key: "storeAddress", value: "Str. Mobilei nr. 10, București", group: "store" },
    { key: "freeShippingThreshold", value: "500", group: "shipping" },
    { key: "standardShippingCost", value: "29.99", group: "shipping" },
    { key: "senderName", value: "JONO SRL", group: "shipping" },
    { key: "senderPhone", value: "+40 721 123 456", group: "shipping" },
    { key: "senderAddress", value: "Str. Mobilei nr. 10", group: "shipping" },
    { key: "senderCity", value: "București", group: "shipping" },
    { key: "senderCounty", value: "București", group: "shipping" },
    { key: "senderPostalCode", value: "010101", group: "shipping" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
