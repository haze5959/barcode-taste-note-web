# BarNote Web - Project Rules & Guidelines

## 📌 1. Project Overview
This project provides the web sharing pages and operational pages (Terms of Service, Landing, etc.) for the **BarNote** app.
> **BarNote** is a mobile app for writing quick tasting notes using barcode recognition and AI label scanning.

**CRITICAL:** The AI assistant MUST read and understand this document before starting any task. Always adhere to the tech stack and guidelines specified below.

---

## 🛠 2. Tech Stack
| Category | Technology |
|---|---|
| **Language** | TypeScript (Strict mode, no `any`) |
| **Framework** | React 19 + Vite 6 |
| **Routing** | React Router v7 |
| **Styling** | Tailwind CSS v4 + Custom CSS Variables |
| **Animations** | Framer Motion |
| **i18n** | i18next / react-i18next |
| **Backend/Services** | Custom API (`src/lib/api`) + Firebase (Analytics/Config) |
| **Package Manager** | npm (Use `--legacy-peer-deps` if needed) |
| **Deployment** | Cloudflare R2 (Static Hosting via GitHub Actions) |

---

## 🚀 3. Core Features & Routes
| Page | Route | Description |
|---|---|---|
| **Landing (Home)** | `/` | Service introduction & App download promotion |
| **User Note List** | `/user/:user_id` | Displays a specific user's tasting notes |
| **Note Detail** | `/note/:note_id` | Detailed view of a single tasting note |
| **Privacy Policy** | `/privacy_policy` | Privacy Policy |
| **Terms of Service** | `/terms_of_service` | Terms of Service |

---

## 📁 4. Folder Structure
```text
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── layout/      # Layout components (Header, Footer)
│   ├── icons/       # Custom SVG icons
│   └── ...          # Domain components (NoteRow, ProductRow, SEO, etc.)
├── pages/           # Route-level components (Home, NoteDetail, etc.)
├── lib/             # Utilities, API client (`apiClient.ts`), i18n, Firebase
│   └── api/         # API endpoint functions
├── types/           # Global TypeScript interfaces & types
├── index.css        # Global CSS & Tailwind configuration (CSS Variables)
├── App.tsx          # Router configuration
└── main.tsx         # Application entry point
public/
├── locales/         # i18n JSON translation files (11 languages supported)
└── screenshots/     # App preview screenshots
```

---

## 🎨 5. UI & Styling Rules
1. **Tailwind CSS v4:** Use Tailwind utility classes for layout, spacing, and typography. Avoid inline `style` attributes unless dynamic values are required.
2. **Custom Theming:** The project uses custom CSS variables (e.g., `var(--color-background-primary)`, `var(--color-accent)`) defined in `index.css`. Always use these variables for colors to maintain brand consistency and dark mode support.
3. **Mobile-First Responsive Design:** The web pages are closely tied to a mobile app. Design for mobile first, then enhance for desktop (`md:`, `lg:` prefixes).
4. **Animations:** Use `framer-motion` for smooth, modern UI transitions (e.g., fade-ups, scroll animations).

---

## 🌐 6. i18n (Internationalization) Rules
1. **No Hardcoded Text:** ALL user-facing text MUST be output using the translation function (`t('key')`).
2. **Translation Files:** Manage translations in `public/locales/{lang}/translation.json`. Currently, 11 languages are supported.
3. **Key Naming:** Use clear, hierarchical keys (e.g., `home.preview_title`, `note.detail_title`).
4. **Updating Translations:** When adding new text, ALWAYS update the corresponding keys in all supported language JSON files.

---

## ⚙️ 7. Coding Conventions
1. **TypeScript Strictness:** Do NOT use `any`. Always define clear interfaces or types in `src/types/` before implementing new data structures.
2. **Functional Components:** Use functional components exclusively. File and component names must follow `PascalCase`.
3. **Separation of Concerns:** Extract reusable logic into custom hooks (`src/hooks/`) or utility functions (`src/lib/`).
4. **SEO & Meta Tags:** Use the `SEO` component for updating meta tags, titles, and Open Graph data per page.
5. **Language:** Keep code comments, commit messages, and Implementation Plans in **Korean (한국어)** as requested by the user, although this RULES.md is in English.

---

## 🚢 8. Build & Deployment
- **Local Dev:** `npm run dev`
- **Production Build:** `npm run build` (Includes `tsc -b` validation)
- **Deployment:** Automatically deployed to Cloudflare R2 via GitHub Actions on push to the `main` branch.
- **Environment Variables:** Managed via `.env` files (e.g., API URLs). Secrets are stored in GitHub Repository Secrets and must NEVER be hardcoded.
- **SPA Routing:** Ensure 404 redirects are configured in Cloudflare to support client-side routing.

---

## 🤖 9. AI Assistant Guidelines (CRITICAL)
1. **Context First:** Always review this `RULES.md` and check existing components in `src/components/` before creating new ones to prevent duplication.
2. **Step-by-Step Execution:** For major changes, write an Implementation Plan in Korean and ask for the user's approval before writing code.
3. **Tool Usage:** Use specific tools (e.g., `multi_replace_file_content`, `grep_search`) rather than bash commands whenever possible.
4. **Translation Updates:** When instructed to add or change text, remember to apply the changes across all 11 locale files in `public/locales/`.
5. **Clean Code:** Remove unused imports, format code properly, and maintain the aesthetic quality of the UI (smooth interactions, proper padding, gradients).
