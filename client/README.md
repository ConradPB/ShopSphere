# 🛍️ ShopSphere

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-teal?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux&logoColor=white)](https://redux.js.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.28-red?logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Jest](https://img.shields.io/badge/Jest-29-red?logo=jest&logoColor=white)](https://jestjs.io/)
[![CI](https://github.com/your-username/shopsphere/actions/workflows/main.yml/badge.svg)](https://github.com/your-username/shopsphere/actions)

**ShopSphere** is a next-generation, fully typed e-commerce platform built with **Next.js 14**, **TypeScript**, **Fastify**, and a scalable architecture inspired by modern MERN workflows.  
It blends a smooth user experience with clean UI design, strong state management, and robust test coverage (80%+).

---

## 🚀 Features

- 🏠 **Home Page:** Dynamic hero section with animated product showcases.
- 🛒 **Product Grid:** Responsive, hover-animated product cards.
- 💬 **Product Details:** Recommendations, wishlist & cart integration.
- 💖 **Wishlist + Cart:** Powered by Redux Toolkit slices.
- ✨ **Smooth Animations:** Framer Motion for page transitions & carousels.
- 🧠 **Type-Safe Everything:** Full TypeScript coverage.
- ✅ **Testing Suite:** Jest + React Testing Library (33 suites, 100% pass rate).

---

## 🛠 Tech Stack

| Layer          | Technologies                                                                              |
| -------------- | ----------------------------------------------------------------------------------------- |
| **Frontend**   | Next.js 14, React 18, TypeScript, Redux Toolkit, Tailwind CSS, Material UI, Framer Motion |
| **Backend**    | Fastify, Node.js, Supabase, MongoDB _(planned)_                                           |
| **Testing**    | Jest, React Testing Library                                                               |
| **Deployment** | Vercel (frontend), Render/Fly.io _(backend planned)_                                      |

---

## 📂 Project Structure

```text
ShopSphere/
├─ client/
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ home/           # Home page
│  │  │  ├─ product/        # Dynamic product routes
│  │  │  ├─ cart/           # Cart page
│  │  │  ├─ wishlist/       # Wishlist page
│  │  │  ├─ checkout/       # Checkout (stub)
│  │  │  └─ layout.tsx
│  │  ├─ components/        # UI components
│  │  ├─ redux/             # Redux slices & store
│  │  ├─ lib/               # Utilities & helpers
│  │  └─ types/             # TypeScript types
│  └─ __tests__/            # Jest + RTL tests
└─ server/                  # Fastify backend (planned API layer)
⚡ Getting Started
Prerequisites
- Node.js ≥ 18

- Yarn

Clone & Install
bash
Copy code
git clone https://github.com/your-username/shopsphere.git
cd shopsphere/client
yarn install
Run Locally
bash
Copy code
yarn dev
Visit → http://localhost:3000

🧪 Testing
Run all tests:

bash
Copy code
yarn test
Current Coverage:

✅ 33/33 test suites passing

✅ 78/78 tests passing

📈 ~80% overall coverage

Focus areas include:

HomePage, ProductGrid, ProductDetailClient, WishlistButton, Redux slices, and utilities.

📈 Why ShopSphere Matters
ShopSphere isn’t another store clone — it’s a production-grade, type-safe foundation designed to evolve into a fully AI-driven marketplace.

✨ Highlights

- Clean UI + rich animations (Tailwind + Framer Motion)

- TypeScript for reliability and scalability

- Realistic Redux flows for cart/wishlist

- Modular architecture, AI-ready for future product recommendations

🔮 Roadmap
 Complete backend with Supabase

 Add AI-powered recommendations

 Integrate payments (Stripe/Crypto)

 Push test coverage >90%

 Global responsive & performance refinements

🤝 Contributing
bash
Copy code
git checkout -b feature/my-feature
git commit -m "Add my feature"
git push origin feature/my-feature
Then open a Pull Request 🚀

📜 License
MIT License © 2025 [Your Name]

🌐 Deployment
Deployed on Vercel
→ Build command: yarn build
→ Output directory: .next
→ Environment variables set via Vercel → Settings → Environment Variables

🛠 Made with care by Baobab Digital

A future-forward software initiative blending design, AI, and clean code.
```
