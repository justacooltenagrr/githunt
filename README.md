# GitHunt

A curated discovery platform for finding free, open-source alternatives to expensive proprietary software — featuring direct download links, verified GitHub repository links, annual subscription savings tracking, and zero telemetry.

**Live Demo:** [githunt.netlify.app](https://githunt.netlify.app)

---

## Features

- **32 Curated Open-Source Tools** (`src/data/tools.ts`)
  - Every entry includes what proprietary software it replaces, estimated annual savings, supported platforms, installation difficulty (`1-click`, `portable`, `basic-setup`, `web`), license, GitHub stars, repo health score, and direct download/repository links.
- **8 Filterable Categories** (`src/components/SearchAndFilters.tsx`)
  - Creative & Design, Office & Productivity, Privacy & Security, System Utilities, Open Fonts, Icon Packs, and Web Utilities.
  - Filter by OS/platform (`Windows`, `macOS`, `Linux`, `Web`, `Android`, `iOS`) and sort by GitHub Stars, Annual Savings, Health Score, or Name.
- **5 Curated Starter Packs** (`src/data/starterPacks.ts`)
  - **Student Essentials**, **Creator Toolkit**, **Privacy Shield**, **Office & Productivity**, and **Design Assets & UI**.
- **My Stack Drawer** (`src/components/MyStackDrawer.tsx`)
  - Save favorite open-source replacements locally (`localStorage`) and calculate your total annual subscription savings with interactive feedback.
- **Tool Details & Community Submissions** (`src/components/ToolDetailModal.tsx`, `src/components/SubmitToolModal.tsx`)
  - Inspect full feature breakdowns, proprietary comparisons, platform installers, or add new tools to the session catalog.

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons & Effects:** `lucide-react`, `canvas-confetti`
- **Linting:** `oxlint`
- **Hosting:** Netlify (`netlify.toml`)

---

## Project Structure

```text
githunt/
├── index.html
├── package.json
├── vite.config.ts
├── netlify.toml
├── tsconfig.json
├── public/
│   ├── githunt-icon.jpg
│   ├── githunt-logo.jpg
│   └── logos/              # Tool icons and logos
└── src/
    ├── App.tsx             # Main state, filtering, sorting, and My Stack logic
    ├── main.tsx
    ├── types.ts            # TypeScript interfaces for tools, packs, and filters
    ├── index.css
    ├── App.css
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Hero.tsx
    │   ├── SearchAndFilters.tsx
    │   ├── ToolCard.tsx
    │   ├── ToolDetailModal.tsx
    │   ├── MyStackDrawer.tsx
    │   ├── SubmitToolModal.tsx
    │   └── Footer.tsx
    └── data/
        ├── tools.ts        # Curated open-source alternatives catalog
        └── starterPacks.ts # Pre-built software bundles
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended) and `npm`

### Local Development

```bash
git clone https://github.com/justacooltenagrr/githunt.git
cd githunt
npm install
npm run dev
```

### Lint, Build & Preview

```bash
npm run lint
npm run build
npm run preview
```

---

## License

Licensed under the [MIT License](LICENSE).
