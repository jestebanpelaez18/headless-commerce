# Headless Commerce — Arabian Fragrance

A custom, multilingual e-commerce application built for Arabian Fragrance, a perfume brand based in Helsinki. Developed with **Next.js, TypeScript and Shopify**, from storefront implementation and catalog modeling to automated testing and production handover.

**Developer:** [Juan Esteban Pelaez Hoyos](https://github.com/jestebanpelaez18) · **Role:** Full Stack Developer

[Client website](https://wantafc.com) · [Technical guide](docs/technical-guide.md) · [Code walkthrough](#code-walkthrough)

This repository is my portfolio copy of the project delivered to the client. The client website is maintained separately and may evolve beyond the version shown here.

<!-- Add a CURRENT desktop screenshot here once captured:
![Arabian Fragrance storefront](docs/images/storefront-desktop.webp)
Do not reuse the legacy public/*-preview.png images without checking them.
-->

## The project

Arabian Fragrance Company Ltd Oy needed an online store that combined an editorial brand presentation with practical product discovery. Customers needed to explore different fragrance formats, understand scent profiles and concentrations, and move from browsing to checkout on desktop or mobile.

The business also needed to update its catalog and editorial content through Shopify. I built the storefront independently of Shopify themes and connected it to Shopify's commerce and content APIs. This gave the brand a custom interface while keeping products, prices, availability and connected content manageable by the store team.

## My contribution

I was responsible for the storefront application and its Shopify integration, including:

- Translating the brand direction into responsive page layouts, navigation and reusable components.
- Structuring product data and metafields for fragrance notes, concentration, ingredients and product relationships.
- Implementing catalog browsing, URL-based filters, ranked search, product recommendations and fragrance layering sections.
- Building the persistent shopping bag and the server endpoint that creates the checkout flow through Shopify's Cart API.
- Connecting homepage sections, brand pages, policies and social links to editable Shopify content.
- Implementing English, Finnish and Swedish routes, localized interface text and product metadata.
- Adding automated checks, unit and browser tests, deployment configuration and technical documentation for handover.

My wider work with the business included catalog preparation, product information, supplier coordination and sales training materials. Working directly with the products helped me translate fragrance terminology and store operations into the application's data model and shopping experience.

## Storefront experience

| Area              | Implementation                                                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Product discovery | Dedicated catalogs for perfumes, oils and attars, body mists, discovery sets and perfume collections                             |
| Catalog filtering | Scent profile, gender and collection selections represented in URL query parameters, with filter counts and empty states         |
| Search            | Ranked matches across names, fragrance notes, collections, product types and gender, with aliases across the supported languages |
| Product pages     | Image galleries, fragrance notes, concentration, ingredients, layering suggestions and related products                          |
| Shopping bag      | Persistent quantities and subtotals, with drawer and full-page views                                                             |
| Checkout          | Server-created Shopify cart followed by Shopify-hosted checkout                                                                  |
| Editorial content | Shopify-managed homepage sections, Our Story, showroom information, FAQ, policies and social links                               |
| Localization      | English, Finnish and Swedish routes, UI labels and Shopify content queries                                                       |

<!-- Add CURRENT screenshots after capturing them. These links intentionally stay
commented out until the files exist, so the README has no broken images.

### Catalog and filters
![Product catalog with scent, gender and collection filters](docs/images/catalog-filters.webp)

### Product detail
![Product gallery, fragrance notes and shopping actions](docs/images/product-detail.webp)

### Mobile experience
<p>
  <img src="docs/images/mobile-navigation.webp" alt="Mobile navigation" width="280" />
  <img src="docs/images/mobile-product.webp" alt="Mobile product page" width="280" />
</p>
-->

## Engineering decisions

### A custom storefront with Shopify-managed commerce

Next.js owns the interface, routes and presentation. Shopify provides catalog data, product relationships, editable content and checkout. The integration uses GraphQL queries, product mapping functions and dedicated content readers rather than coupling components directly to a Shopify theme.

Server-rendered routes fetch product and editorial content. Client components handle interactions such as filter panels, search overlays and the shopping bag.

### Stable catalog behavior across languages

Translated product fields can change the values used by filters. The catalog keeps canonical classification values separate from translated display text and normalizes supported aliases. This allows customers to browse localized content while filter behavior remains consistent.

### Search built around fragrance discovery

Search goes beyond matching product titles. A deterministic ranking function weights title matches above notes, collections and other fields. It normalizes accents and recognizes aliases such as English, Finnish and Swedish scent terms. Every meaningful query word must match, which helps avoid loosely related results.

### Two distinct approaches to related products

Related-product recommendations rank products of the same type by shared scent accords, collection membership and gender affinity, with stable tie-breaking. Layering suggestions use relationships managed in Shopify, allowing the store team to select complementary products explicitly.

### Editable content with controlled presentation

Shopify metaobjects supply structured content for the homepage, Our Story and showroom pages. Shopify pages and policies supply longer content, with HTML sanitization before rendering. Selected editorial sections have local fallbacks when remote content is unavailable.

Colors, typography and responsive layouts remain in the codebase, so content editing and visual design have clear responsibilities.

### A small client-side bag with server-created checkout

Zustand persists the shopping bag in browser storage. At checkout, the frontend sends variant identifiers and quantities to a Next.js route handler, which creates a Shopify cart and returns its checkout URL. Payment collection is handled by Shopify's hosted checkout.

## Technology

| Layer                | Tools                                                       |
| -------------------- | ----------------------------------------------------------- |
| Application          | Next.js 16 App Router, React 19, TypeScript                 |
| Styling              | Tailwind CSS 4, custom typography and responsive components |
| Commerce and content | Shopify Storefront API, GraphQL, metafields and metaobjects |
| Client state         | Zustand with local storage persistence                      |
| Content sanitization | sanitize-html                                               |
| Testing              | Playwright unit tests and browser tests                     |
| Quality checks       | ESLint, Prettier, TypeScript and GitHub Actions             |
| Hosting              | Vercel                                                      |

## Testing and quality

The repository includes unit tests for catalog filtering and HTML sanitization, plus browser tests for catalog interactions, search, product pages, the shopping bag, translations and responsive navigation.

The browser configuration covers desktop Chromium and Firefox, mobile WebKit with iPhone emulation, and mobile Chromium with Pixel emulation. These are browser/device emulation projects rather than physical-device tests.

GitHub Actions runs lint, formatting checks, TypeScript checks, unit tests, a production build and a selected browser suite covering shop interactions and responsive navigation. Playwright reports and failure artifacts support investigation.

Browser tests depend on Shopify-backed content, so catalog changes can affect their expectations.

## Code walkthrough

These files are useful starting points for reviewing the implementation:

| File                                                             | What to look at                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------- |
| [`lib/shop/catalog-filters.ts`](lib/shop/catalog-filters.ts)     | Parsing, validating and combining URL filter selections |
| [`lib/shop/search.ts`](lib/shop/search.ts)                       | Multilingual aliases and weighted product ranking       |
| [`lib/shop/recommendations.ts`](lib/shop/recommendations.ts)     | Deterministic product recommendations                   |
| [`lib/shopify/mapper.ts`](lib/shopify/mapper.ts)                 | Converting Shopify fields into the shared product model |
| [`lib/shopify/get-about-page.ts`](lib/shopify/get-about-page.ts) | Reading structured editorial content from Shopify       |
| [`lib/cart/store.ts`](lib/cart/store.ts)                         | Shopping bag state and persistence                      |
| [`app/api/checkout/route.ts`](app/api/checkout/route.ts)         | Creating a Shopify cart from variant IDs and quantities |
| [`lib/sanitize-shopify-html.ts`](lib/sanitize-shopify-html.ts)   | Sanitizing Shopify page and policy HTML                 |
| [`tests/unit/`](tests/unit/)                                     | Isolated catalog and sanitization tests                 |
| [`tests/responsive.spec.ts`](tests/responsive.spec.ts)           | Responsive navigation regression tests                  |

Product routes also generate metadata and Product JSON-LD for search engines.

## Running locally

Use Node.js 20 to match the existing CI workflow.

```bash
npm ci
```

Create `.env.local` in the project root using a Shopify store you are authorized to access:

```dotenv
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

The catalog requires a configured Shopify connection. This repository does not currently provide a standalone mock-data demo. Matching metafields and content definitions are described in the [technical guide](docs/technical-guide.md). Client credentials are not included.

<details>
<summary>Checks and test commands</summary>

```bash
# Lint, formatting, TypeScript and production build
npm run ci

# Unit tests (separate from npm run ci)
npx playwright test --config=playwright.unit.config.ts

# Install browsers before the first browser test run
npx playwright install --with-deps

# Browser suite
npx playwright test

# Open the browser test report
npx playwright show-report
```

See the [technical guide](docs/technical-guide.md) for all commands, environment configuration and CI details. Its production-domain instructions describe the original client storefront; use your own deployment URL for a separate portfolio deployment.

</details>

## Project status and attribution

The original application was delivered to Arabian Fragrance Company Ltd Oy. This repository preserves my implementation for portfolio presentation and further development independently of the client's repository.

The linked client website is a live commercial store. A separate portfolio deployment should use its own configuration and disable real purchases.

Development and storefront implementation: **Juan Esteban Pelaez Hoyos**. Brand identity, product photography and other supplied brand assets are credited to their respective owners and contributors.

See [LICENSE](LICENSE) for the existing usage restrictions.
