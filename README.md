# BillTrack Pro - Frontend

A modern invoice management dashboard built with **Next.js 16**, **React**, **TypeScript**, and **Zustand**.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Zustand](https://img.shields.io/badge/Zustand-5.0-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🏗️ Architecture

```
app/
├── components/
│   ├── ui/           # Button, Input, Card, Badge, Avatar, LoadingSpinner, ErrorDisplay
│   ├── layout/       # Sidebar
│   └── features/     # Feature-specific components
├── lib/
│   ├── stores/       # Zustand State Management
│   │   ├── useInvoiceStore.ts
│   │   ├── useClientStore.ts
│   │   ├── useDashboardStore.ts
│   │   └── useReportsStore.ts
│   └── services/     # API Layer
│       ├── api.ts
│       ├── invoiceService.ts
│       └── clientService.ts
├── types/            # TypeScript interfaces
└── [pages]/          # Dynamic routing
```

## 🚀 Getting Started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Production build
```

## 📋 Features

| Route | Store | Description |
|-------|-------|-------------|
| `/` | `useDashboardStore` | Dashboard with live stats |
| `/clients` | `useClientStore` | Client directory |
| `/invoices` | `useInvoiceStore` | Invoice management |
| `/reports` | `useReportsStore` | Analytics & charts |
| `/settings/[tab]` | - | Dynamic settings pages |

## 🎨 UI Components

| Component | Variants |
|-----------|----------|
| `Button` | primary, secondary, ghost, danger |
| `Input` | with icon, error state |
| `Card` | header, content, footer |
| `Badge` | success, warning, danger, info |
| `Avatar` | sm, md, lg with fallback initials |
| `LoadingSpinner` | sm, md, lg |
| `ErrorDisplay` | with retry button |

## 🛠️ Tech Stack

- **Next.js 16** - App Router (React 19 RC)
- **TypeScript** - Zero `any` types
- **Zustand** - 4 Stores
- **Tailwind CSS 3.4** - Styling

## 📁 Environment

Create a `.env.local` file to configure your API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5251/api
```

## 📝 License

MIT License
