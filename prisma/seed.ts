import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"]! });
const prisma = new PrismaClient({ adapter });

const categories = [
  {
    name: "Prăjituri",
    slug: "prajituri",
    description: "Prăjituri artizanale preparate cu ingrediente naturale",
    imageUrl: "https://picsum.photos/seed/prajituri/600/600",
    children: [
      { name: "Prăjituri de casă", slug: "prajituri-de-casa", description: "Rețete tradiționale românești" },
      { name: "Prăjituri cu ciocolată", slug: "prajituri-cu-ciocolata", description: "Pentru iubitorii de ciocolată" },
      { name: "Prăjituri cu fructe", slug: "prajituri-cu-fructe", description: "Cu fructe proaspete de sezon" },
    ],
  },
  {
    name: "Torturi",
    slug: "torturi",
    description: "Torturi personalizate pentru orice ocazie",
    imageUrl: "https://picsum.photos/seed/torturi/600/600",
    children: [
      { name: "Torturi de nuntă", slug: "torturi-de-nunta", description: "Torturi elegante pentru nuntă" },
      { name: "Torturi aniversare", slug: "torturi-aniversare", description: "Torturi pentru zile de naștere" },
      { name: "Torturi corporate", slug: "torturi-corporate", description: "Torturi pentru evenimente corporate" },
    ],
  },
  {
    name: "Bomboane",
    slug: "bomboane",
    description: "Bomboane artizanale și trufe fine",
    imageUrl: "https://picsum.photos/seed/bomboane/600/600",
    children: [
      { name: "Trufe", slug: "trufe", description: "Trufe de ciocolată belgiene" },
      { name: "Praline", slug: "praline", description: "Praline asortate" },
      { name: "Bomboane fondante", slug: "bomboane-fondante", description: "Bomboane fondante clasice" },
    ],
  },
  {
    name: "Biscuiți",
    slug: "biscuiti",
    description: "Biscuiți crocanți și macarons delicioase",
    imageUrl: "https://picsum.photos/seed/biscuiti/600/600",
    children: [
      { name: "Macarons", slug: "macarons", description: "Macarons franțuzești autentice" },
      { name: "Biscuiți artizanali", slug: "biscuiti-artizanali", description: "Biscuiți făcuți manual" },
      { name: "Fursecuri", slug: "fursecuri", description: "Fursecuri fine asortate" },
    ],
  },
  {
    name: "Deserturi Speciale",
    slug: "deserturi-speciale",
    description: "Deserturi premium pentru cunoscători",
    imageUrl: "https://picsum.photos/seed/deserturi/600/600",
    children: [
      { name: "Ecleruri", slug: "ecleruri", description: "Ecleruri cu diverse umpluturi" },
      { name: "Cheesecake", slug: "cheesecake", description: "Cheesecake în diverse variante" },
      { name: "Tarte", slug: "tarte", description: "Tarte cu fructe și creme fine" },
    ],
  },
];

const products = [
  { name: "Prăjitură Dobos", slug: "prajitura-dobos", price: 45.00, salePrice: null, sku: "PD-001", stock: 25, catSlug: "prajituri-de-casa", weight: 0.5 },
  { name: "Amandine Clasice", slug: "amandine-clasice", price: 38.00, salePrice: 32.00, sku: "AC-002", stock: 30, catSlug: "prajituri-cu-ciocolata", weight: 0.4 },
  { name: "Prăjitură cu vișine", slug: "prajitura-cu-visine", price: 42.00, salePrice: null, sku: "PV-003", stock: 15, catSlug: "prajituri-cu-fructe", weight: 0.5 },
  { name: "Tort Red Velvet", slug: "tort-red-velvet", price: 189.00, salePrice: 165.00, sku: "TRV-004", stock: 5, catSlug: "torturi-aniversare", weight: 1.5 },
  { name: "Tort Nuntă Elegant", slug: "tort-nunta-elegant", price: 450.00, salePrice: null, sku: "TNE-005", stock: 3, catSlug: "torturi-de-nunta", weight: 3.0 },
  { name: "Trufe Belgiene", slug: "trufe-belgiene", price: 65.00, salePrice: 55.00, sku: "TB-006", stock: 40, catSlug: "trufe", weight: 0.25 },
  { name: "Praline Asortate 250g", slug: "praline-asortate-250g", price: 78.00, salePrice: null, sku: "PA-007", stock: 20, catSlug: "praline", weight: 0.25 },
  { name: "Macarons Vanilie", slug: "macarons-vanilie", price: 55.00, salePrice: 48.00, sku: "MV-008", stock: 35, catSlug: "macarons", weight: 0.2 },
  { name: "Ecler cu Ciocolată", slug: "ecler-cu-ciocolata", price: 18.00, salePrice: null, sku: "EC-009", stock: 50, catSlug: "ecleruri", weight: 0.15 },
  { name: "Cheesecake New York", slug: "cheesecake-new-york", price: 120.00, salePrice: 99.00, sku: "CNY-010", stock: 8, catSlug: "cheesecake", weight: 1.0 },
  { name: "Tartă cu Căpșuni", slug: "tarta-cu-capsuni", price: 95.00, salePrice: null, sku: "TC-011", stock: 10, catSlug: "tarte", weight: 0.8 },
  { name: "Fursecuri cu Unt", slug: "fursecuri-cu-unt", price: 35.00, salePrice: 29.00, sku: "FU-012", stock: 45, catSlug: "fursecuri", weight: 0.3 },
  { name: "Bomboane Fondante Mix", slug: "bomboane-fondante-mix", price: 42.00, salePrice: null, sku: "BFM-013", stock: 60, catSlug: "bomboane-fondante", weight: 0.3 },
  { name: "Tort Ciocolată Belgiană", slug: "tort-ciocolata-belgiana", price: 210.00, salePrice: 185.00, sku: "TCB-014", stock: 4, catSlug: "torturi-aniversare", weight: 1.8 },
  { name: "Biscuiți cu Scorțișoară", slug: "biscuiti-cu-scortisoara", price: 28.00, salePrice: null, sku: "BS-015", stock: 55, catSlug: "biscuiti-artizanali", weight: 0.25 },
  { name: "Macarons Fistic", slug: "macarons-fistic", price: 62.00, salePrice: null, sku: "MF-016", stock: 20, catSlug: "macarons", weight: 0.2 },
  { name: "Prăjitură Cremeș", slug: "prajitura-cremes", price: 40.00, salePrice: 35.00, sku: "PC-017", stock: 18, catSlug: "prajituri-de-casa", weight: 0.5 },
  { name: "Trufe Champagne", slug: "trufe-champagne", price: 89.00, salePrice: null, sku: "TCH-018", stock: 15, catSlug: "trufe", weight: 0.25 },
  { name: "Ecler cu Vanilie", slug: "ecler-cu-vanilie", price: 16.00, salePrice: null, sku: "EV-019", stock: 50, catSlug: "ecleruri", weight: 0.15 },
  { name: "Tort Corporate Logo", slug: "tort-corporate-logo", price: 320.00, salePrice: 280.00, sku: "TCL-020", stock: 2, catSlug: "torturi-corporate", weight: 2.5 },
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
        description: `<p>${p.name} — produs artizanal de înaltă calitate, preparat cu ingrediente naturale selecționate cu grijă. Fiecare porție este realizată manual de maeștri cofetari cu experiență.</p><p>Gramaj: ${(p.weight * 1000).toFixed(0)}g. Condiții de păstrare: la frigider, între 2-6°C.</p>`,
        price: p.price,
        salePrice: p.salePrice,
        sku: p.sku,
        stock: p.stock,
        weight: p.weight,
        status: "PUBLISHED",
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
    { key: "storeName", value: "AramSweet", group: "store" },
    { key: "storePhone", value: "+40 721 123 456", group: "store" },
    { key: "storeEmail", value: "contact@aramsweet.ro", group: "store" },
    { key: "storeAddress", value: "Str. Dulciurilor nr. 10, București", group: "store" },
    { key: "freeShippingThreshold", value: "200", group: "shipping" },
    { key: "standardShippingCost", value: "19.99", group: "shipping" },
    { key: "senderName", value: "AramSweet SRL", group: "shipping" },
    { key: "senderPhone", value: "+40 721 123 456", group: "shipping" },
    { key: "senderAddress", value: "Str. Dulciurilor nr. 10", group: "shipping" },
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
