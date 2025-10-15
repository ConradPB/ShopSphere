# AI-Powered-E-Commerce-Platform(ShopSphere)

# 🛍️ ShopSphere

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-teal?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux&logoColor=white)](https://redux.js.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.28-red?logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Jest](https://img.shields.io/badge/Jest-29-red?logo=jest&logoColor=white)](https://jestjs.io/)

**ShopSphere** is a modern, fully-typed e-commerce platform built with **Next.js 13**, **TypeScript**, **Fastify**, and a modular MERN stack structure. It combines beautiful UI animations, product carousels, and a scalable architecture for future AI-powered features.

---

## 🚀 Features

- **Home Page**: Hero section with dynamic product showcase and smooth animations.
- **Product Grid**: Responsive, interactive grid with hover effects.
- **Product Detail Pages**: Detailed product info with recommendations and cart/wishlist actions.
- **Cart & Wishlist**: State managed via Redux Toolkit.
- **Animations & Interactivity**: Framer Motion for fade-ins, carousels, and hover effects.
- **TypeScript**: Fully typed slices, components, and utilities for maximum safety.
- **Testing**: Jest + React Testing Library for core components and pages.

---

## 🛠 Tech Stack

**Frontend:** Next.js 13, React 18, TypeScript, Redux Toolkit, Tailwind CSS, Material UI, Framer Motion, Axios, Recharts  
**Backend:** Fastify, Node.js, MongoDB (planned)  
**Testing:** Jest, React Testing Library

---

## 📂 Project Structure

```text
client/
├─ src/
│  ├─ app/
│  │  ├─ home/                # Home page
│  │  ├─ product/             # Product pages (dynamic [id] routes)
│  │  ├─ cart/                # Cart page
│  │  ├─ checkout/            # Checkout page (stub)
│  │  ├─ wishlist/            # Wishlist page
│  │  └─ layout.tsx           # Global layout
│  ├─ components/             # Reusable React components
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductGrid.tsx
│  │  ├─ FeaturedProducts.tsx
│  │  └─ ...
│  ├─ redux/                  # Redux slices and store
│  ├─ lib/                    # Utilities (products, supabase, etc.)
│  └─ types/                  # TypeScript type definitions
└─ __tests__/                  # Jest + RTL tests
⚡ Getting Started
Prerequisites
Node.js >= 18

Yarn

Install Dependencies
bash
Copy code
git clone https://github.com/your-username/shopsphere.git
cd shopsphere/client
yarn install
Run Locally
bash
Copy code
yarn dev
Open http://localhost:3000 in your browser.

🧪 Testing
Run tests with:

bash
Copy code
yarn test
Core components and pages are partially covered (~35% coverage currently).

Focus is on HomePage, ProductGrid, ProductDetailClient, and Redux slices.

📈 Why ShopSphere Matters
ShopSphere isn’t just another e-commerce clone — it’s a full-stack, production-ready MERN/Next.js project with:

Modern frontend design: Tailwind + Material UI + Framer Motion animations.

Strong TypeScript discipline, improving reliability and maintainability.

Realistic redux state management and product workflows (cart, wishlist, recommendations).

Testing setup demonstrating knowledge of unit and integration tests.

Modular architecture ready for AI features, analytics, or payment integrations.

🤝 Contributing
Contributions are welcome:

bash
Copy code
git checkout -b feature/my-feature
git commit -m "Add my feature"
git push origin feature/my-feature
Open a pull request.

📜 License
MIT License

🔮 Future Roadmap
Complete backend API with MongoDB integration.

AI-powered product recommendations.

Payment integration and checkout flow.

Enhanced test coverage >80%.

Responsive UI improvements and performance optimizations.
```
