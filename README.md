# InvenTrack — Inventory Management & Tracking System

A modern, full-featured Inventory Management and Tracking System built with **Angular 18** and **Angular Material**. Designed as an academic project, it demonstrates core Angular concepts including standalone components, reactive routing, and component-driven architecture with a premium UI.

---

## ✨ Features

| Module | Description |
|---|---|
| **Dashboard** | Overview of key metrics — total products, low-stock alerts, pending orders, and supplier count |
| **Products** | Browse, search, and manage the product inventory with stock status indicators |
| **Product Detail** | Deep-dive view of a single product including stock history and supplier info |
| **Suppliers** | Manage supplier records and associated contact information |
| **Order Tracker** | Track the status of purchase orders from pending through to delivered |
| **Reports** | Visual analytics for inventory trends, stock levels, and order summaries |

---

## 🛠️ Tech Stack

- **Framework:** Angular 18 (Standalone Components)
- **UI Library:** Angular Material 18 + CDK
- **Routing:** Angular Router
- **Language:** TypeScript 5.4
- **Styling:** Component-scoped CSS with a cohesive design system (olive-green dark sidebar + warm off-white content area)

---

## 📁 Project Structure

```
src/
└── app/
    ├── app.component.ts       # Root shell — sidenav, toolbar, router outlet
    ├── app.routes.ts          # Application route definitions
    ├── app.config.ts          # Bootstrap configuration
    └── components/
        ├── dashboard/         # Summary stats & quick-glance cards
        ├── product-list/      # Searchable product table
        ├── product-detail/    # Single product view (route: /product/:id)
        ├── supplier-list/     # Supplier management table
        ├── order-tracker/     # Order status pipeline
        └── reports/           # Charts & inventory analytics
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- Angular CLI v18

```bash
npm install -g @angular/cli
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd inventory-management-system

# Install dependencies
npm install
```

### Running the App

```bash
npm start
# or
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser. The app will automatically reload on file changes.

### Build for Production

```bash
npm run build
```

Output files are written to the `dist/` directory.

---

## 🧭 Route Map

| Route | Component |
|---|---|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Dashboard |
| `/products` | Product List |
| `/product/:id` | Product Detail |
| `/suppliers` | Supplier List |
| `/orders` | Order Tracker |
| `/reports` | Reports |

---

## 🎨 Design System

- **Sidebar:** Deep olive-green gradient (`#1a1e11` → `#232c18`) with subtle glassmorphism on active items
- **Toolbar:** Clean white top bar with a pulsing **Live** status chip
- **Content Background:** Warm off-white (`#f5f3ec`) for reduced eye strain
- **Accent Colour:** Muted olive-green (`#6b7c45` / `#c8d89a`) used for highlights, badges, and active states
- **Typography:** Angular Material defaults with refined weight and spacing

---

## 📚 Academic Context

This project was built as **Project 25** to demonstrate proficiency in:

- Angular standalone component architecture
- Client-side routing with Angular Router
- Angular Material component library
- TypeScript interfaces and typing
- Component-scoped styling

---

## 📄 License

This project is for academic use only.
