# WALEcom Web

A modern e-commerce web built with Next.js 16, React 19, and TypeScript. This application serves as a frontend for an e-commerce platform, integrating with a Django REST API backend while providing fallback static data for development.

## Features

- **Product Catalog**: Browse and search products with category filtering
- **Product Details**: Individual product pages with variants and related products
- **User Authentication**: Login, registration, and profile management
- **Modern UI**: Responsive design with Tailwind CSS v4
- **Performance**: Server-side rendering (SSR) with Incremental Static Regeneration (ISR)
- **Docker Support**: Multi-stage Docker builds for development and production
- **Testing**: Vitest integration with testing library

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Runtime**: React 19.2.3 with TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library
- **Containerization**: Docker multi-stage builds

## Project Structure

```
src/app/
├── (site)/              # Public pages route group
│   ├── catalog/         # Product catalog with search/filter
│   ├── product/[slug]/  # Dynamic product detail pages
│   ├── login/           # User authentication
│   ├── register/        # User registration
│   ├── profile/         # User profile management
│   └── about/           # About page
├── api/                 # API routes (backend proxy/mock)
├── layout.tsx           # Root layout with Header/Footer
└── page.tsx             # Homepage (Hero + Featured + Contact)

src/components/
├── layout/              # Header, Footer components
└── sections/            # Reusable page sections

src/lib/                 # Utilities and API clients
src/types/               # TypeScript type definitions
src/data/                # Static/fallback data
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, or pnpm
- (Optional) Docker and Docker Compose
- (Optional) Django REST API backend running on port 8000

### Installation

1. Clone the repository:
```bash
git clone https://github.com/WALE-Devs/walecom-web.git
cd walecom-web
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.dev
cp .env.example .env.local
cp .env.example .env.test
```

Edit `.env.local` and `.env.test` with your configuration:
```env
INTERNAL_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_MEDIA_URL=http://127.0.0.1:8000/media/
NEXT_TELEMETRY_DISABLED=1
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Development

### Development with Docker Compose

```bash
docker-compose -f docker-compose.dev.yml up
```

This will start the development server in a container with hot reload enabled on port 3000.
