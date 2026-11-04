# Headless Commerce

A custom fragrance storefront built with **Next.js, TypeScript and Shopify** — developed for a real business, from product discovery to checkout.

Built by [Juan Esteban Pelaez Hoyos](https://github.com/jestebanpelaez18).

![Arabian Fragrance storefront — homepage](public/home-preview.png)

## About the project

I built this application for **Arabian Fragrance Company**, a perfume business in Helsinki. The project involved translating a growing product catalog and the needs of a physical shop into an online shopping experience.

I developed the storefront from the ground up, including its responsive interface, Shopify integration, product discovery, shopping bag and checkout handoff. Shopify provides the catalog and editable content; Next.js provides the customer-facing experience.

This repository preserves my work at handover and is the starting point for continued portfolio development. The screenshots document the client storefront. A separate, self-contained portfolio demo is not yet available.

## What I built

- **Responsive storefront:** editorial homepage, collection pages, product listings, product detail pages, and supporting brand and showroom pages.
- **Product discovery:** category navigation, catalog filtering, fragrance-note filters, sorting and search.
- **Detailed product pages:** image galleries, fragrance notes, concentration, ingredients and related product content.
- **Shopping bag:** quantities, item management and state persisted across browser sessions using Zustand.
- **Shopify checkout integration:** a server endpoint creates a Shopify cart and returns its hosted checkout URL.
- **Multilingual interface:** locale-based routes and interface dictionaries for English, Finnish and Swedish, with Shopify content handled separately.
- **Content management:** Shopify products, collections, metafields and metaobjects supply catalog and editorial content.
- **Quality tooling:** TypeScript checks, linting, formatting, Playwright tests and a GitHub Actions workflow.

## A closer look

### Catalog and product discovery

The catalog organizes perfumes, attars, body mists and discovery sets into a shared shopping experience. Filters and search help customers explore products beyond their names.

![Product catalog and filtering interface](public/shop-preview.png)

### Product detail

Product pages bring imagery and structured fragrance information together with the purchase flow.

![Product detail page](public/pdp-preview.png)

## My contribution

I was responsible for the application development and Shopify integration, as well as the product structure needed to connect the two.

Beyond programming, my work included product research, preparing catalog descriptions and fragrance information, organizing product imagery, creating sales-training material, and coordinating product details with the supplier in Dubai. That work informed the catalog model and the information presented to customers.

The brand assets and product materials belong to their respective owners. This repository presents my software development contribution to the original project.

## Technical decisions

| Decision | Purpose |
| --- | --- |
| Custom Next.js storefront with Shopify as the backend | Support a tailored shopping experience while keeping catalog management in Shopify. |
| GraphQL queries and a product-mapping layer | Translate Shopify data into the types and structures used by the interface. |
| Metafields and metaobjects | Model fragrance information and make connected editorial content editable from Shopify. |
| Zustand with browser persistence | Keep the shopping bag available between visits. |
| Locale-based routing and dictionaries | Support three interface languages without duplicating the page structure. |
| Unit and browser tests | Check catalog logic, HTML sanitization and customer-facing interactions. |

## Stack

**Frontend:** Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4  
**Commerce and content:** Shopify Storefront API · GraphQL · metafields · metaobjects  
**State:** Zustand  
**Quality:** Playwright · ESLint · Prettier · GitHub Actions  
**Original hosting:** Vercel

## Running locally

Use **Node.js 20**.

```bash
git clone https://github.com/jestebanpelaez18/headless-commerce.git
cd headless-commerce
npm ci
```

Create `.env.local` in the project root:

```dotenv
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then start the development server:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

**Current requirement:** the catalog and connected content require a configured Shopify backend. This repository does not yet include a standalone sample catalog. Use your own Shopify credentials and keep them out of version control.

The checkout implementation currently redirects to Shopify's hosted checkout. A checkout without real purchases is planned for the independent portfolio demo; it has not been implemented yet.

## Checks

```bash
npm run lint
npm run format
npm run typecheck
npm run build
```

Unit tests:

```bash
npx playwright test --config=playwright.unit.config.ts
```

Browser tests:

```bash
npx playwright install
npx playwright test
```

Browser tests depend on Shopify-backed content. The GitHub Actions workflow also requires Shopify repository secrets.

See the [development guide](docs/DEVELOPMENT.md) for the full setup, test configuration, project structure and content model.

## Next steps

- Introduce an independent demonstration catalog.
- Add a demonstration checkout without real purchases.
- Publish a separate portfolio deployment.
- Update the visual walkthrough as the personal version evolves.

## License

See [LICENSE](LICENSE) for the existing usage restrictions.
