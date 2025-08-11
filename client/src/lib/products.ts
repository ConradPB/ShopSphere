export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export const fallbackProducts: Product[] = [
  {
    id: "1",
    title: "Nike Air Zoom Pegasus 40",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1600180758890-6ff9c1f69d4d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Bose QuietComfort 45",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1617734471336-44bdbbb9b7ba?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Apple Watch Series 9",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1556402524-379b1de8d5c8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "North Face Puffer Jacket",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3f4c?auto=format&fit=crop&w=800&q=80",
  },
];
