import { progress } from "../utils";

export const activedomains = [
  {
    id: 0,
    product: "dev.glodal.com",
    category: "glodal.com",
    icon: "cloudcheck",
    status: true,
    price: "Web",  },
  {
    id: 1,
    product: "prod.glodal.com",
    category: "glodal.com",
    icon: "globe",
    status: false,
    price: "",
  }
];

export const released = [
  {
    id: 0,
    product: "Bento Matte 3D Illustration",
    category: "UI design kit",
    image: "/images/content/product-pic-1.jpg",
    image2x: "/images/content/product-pic-1@2x.jpg",
    price: 98,
    status: true,
    ratingValue: 4.8,
    ratingCounter: 87,
    balance: 55.8,
    views: 47850,
    viewsPercent: progress(),
  },
  {
    id: 1,
    product: "DSM - Geometry pattern",
    category: "UI design kit",
    image: "/images/content/product-pic-2.jpg",
    image2x: "/images/content/product-pic-2@2x.jpg",
    price: 123,
    status: false,
    ratingValue: 4.6,
    ratingCounter: 127,
    sales: 4900,
    balance: 35.8,
    views: 32500,
    viewsPercent: progress(),
  },
];
