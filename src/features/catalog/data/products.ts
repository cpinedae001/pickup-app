import type { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Arroz blanco",
    description: "Bolsa de 1 libra",
    price: 7.5,
    imageUrl: "/images/products/arroz.webp",
    storreIds: [1, 2],
  },
  {
    id: 2,
    name: "Frijol negro",
    description: "Bolsa de 1 libra",
    price: 11.3,
    imageUrl: "/images/products/frijol-negro.jpg",
    storreIds: [1, 2],
  },
  {
    id: 3,
    name: "Aceite",
    description: "Botella de 800 ml",
    price: 18.5,
    imageUrl: "/images/products/aceite-800.jpg",
    storreIds: [1],
  },
  {
    id: 4,
    name: "Azúcar blanca",
    description: "Bolsa de 1 libra",
    price: 5.5,
    imageUrl: "/images/products/azucar-blanca-libra.jpg",
    storreIds: [2],
  },
  {
    id: 5,
    name: "Huevos blancos",
    description: "Cartón de 15 unidades",
    price: 24.0,
    imageUrl: "/images/products/huevos-15.jpg",
    storreIds: [1, 2],
  },
];
