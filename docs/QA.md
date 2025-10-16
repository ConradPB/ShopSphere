# QA & Deployment Checklist

This checklist is meant to be followed before merging release/feature PRs and before deploying to production (Vercel / your host).

---

## Quick status (PR author)

- [ ] All tests pass locally: `yarn test` (client) and `pnpm test` (server)
- [ ] Type-check: `yarn tsc --noEmit` (client)
- [ ] Lint: `yarn lint` (client) and `pnpm lint` (server) if available
- [ ] Coverage threshold met or noted in PR
- [ ] Environment variables documented for the deployment

---

## Pre-merge manual checks (General)

- [ ] Browser: open the app on `http://localhost:3000`
- [ ] Basic navigation works: Home / Products / Product detail / Cart / Wishlist / Checkout
- [ ] No console errors in browser devtools
- [ ] No TypeScript or ESLint errors in CI logs

---

## Client-specific checks (`client/`)

- Environment variables set locally (or `.env.local`):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Build locally: `yarn build`
- [ ] Start production server locally: `yarn start` (if you have it)
- [ ] Test key flows:
  - Add product to cart (verify cart state updates)
  - Add/remove wishlist item
  - Checkout flow navigation (even if checkout is a stub)
  - Products list loads (mock/fallback behavior if Supabase not configured)
- [ ] Accessibility spot-check (tab navigation, semantic tags)
- [ ] Visual sanity: no broken layout on desktop/mobile

---

## Server-specific checks (`server/`)

- [ ] Install and run tests: `pnpm test`
- [ ] Verify API endpoints (e.g., `/api/products`) locally via curl or Postman
- [ ] Confirm database connection settings (for dev/test env)
- [ ] Check logging + error-handling behaviour

---

## Deployment (Vercel) checklist

- [ ] Environment variables set in Vercel (Project → Settings → Environment Variables)
- [ ] Project linked to correct repo and branch
- [ ] Confirm Build & Output Settings:
  - Root / Directory: `client`
  - Build command: `yarn build`
  - Output directory: `.next`
- [ ] Monitor first build logs for missing env or build/runtime errors
- [ ] Smoke test the live URL:
  - Home loads
  - Products show
  - Basic user flows work (add to cart / wishlist)
  - No Supabase auth errors in logs

---

## Post-deploy

- [ ] Confirm analytics / monitoring receive data (if integrated)
- [ ] Check server logs for runtime errors (if applicable)
- [ ] Tag the release or merge commit (optional)

---

## PR Checklist snippet (copy to PR description)

- [ ] Tests: `yarn test` (client), `pnpm test` (server)
- [ ] Lint & Type-check passed
- [ ] QA checklist done (link to `docs/QA.md`)
