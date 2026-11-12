
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This project uses Next.js 16.4.5. APIs, conventions, and structures may differ from your training data.

Before writing code, read the relevant guides in `node_modules/next/dist/docs/`. Follow current APIs and deprecation notices.

Do not assume legacy Next.js conventions are still valid.

<!-- END:nextjs-agent-rules -->

## DFO Donat Project Context

This project is a Donut Production and Operational Management System built with Next.js App Router, React 19, TypeScript, Prisma 7, PostgreSQL, and Lucide React.

Main user roles:
- Admin
- Karyawan Produksi
- Supplier
- Owner

Use the existing project architecture, components, API routes, and Prisma schema. Avoid unnecessary refactoring or duplicate implementations.

## UI/UX Rules

- Primary colors: `#6b21a8`, `#7e22ce`, `#581c87`.
- Background: `#e9d5ff`.
- Cards: `#ffffff`.
- Accents: `#faf5ff`, `#fdf2f8`.
- Keep the left sidebar and top header fixed.
- Only the main content area should have vertical scrolling.
- Product images must use root `public/` assets with `.png` extensions.
- Use `/admin/pemesanan-bahan-baku` for the Admin purchasing menu.
- Profile Batal and Selesai buttons must navigate to `/admin`.
- Logout confirmation must navigate to `/` after successful logout.

## Authentication & RBAC

Use `lib/auth.ts` and `requireRole()` for server-side authorization.

Never trust role information from client requests.

- Admin: operational and administrative management.
- Karyawan Produksi: production activities and production records.
- Supplier: only their own purchase orders and deliveries.
- Owner: business monitoring and purchase order approval.

Supplier must never access another supplier's data.

## Business Logic & Data Integration

All modules must maintain consistent database relationships.

**Purchase Order:**

Admin creates PO → Owner approves → Supplier processes and ships → Verified receipt updates raw material stock and purchasing reports.

**Production:**

Production staff records batches → Update daily capacity → Add accepted products to finished goods stock → Calculate quality ratio.

**Customer Orders (MTO):**

Order creation must validate stock and capacity. Cancellation must restore previously deducted resources without duplicate restoration.

Dashboard and daily/monthly reports must reflect actual database data, not hardcoded mock values.

Use Prisma transactions for operations affecting multiple related tables. Prevent duplicate stock updates and capacity calculations.

## API & Database Rules

- API handlers must validate authentication, roles, inputs, and database errors.
- Use `lib/prisma.ts` for Prisma Client.
- Use `lib/http.ts` for standardized API responses.
- Use `lib/ids.ts` for ID and date utilities.
- Never expose passwords, session secrets, or database credentials.
- Do not edit generated Prisma Client files manually.
- Check existing endpoints before creating new ones.

## Development Commands

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
npm run lint
npm run build
```

Keep `.env` private. Do not include `node_modules/`, `.next/`, or credentials when sharing project source code.

## Final Instructions

Before modifying code:
1. Inspect the relevant files.
2. Understand affected modules and database relationships.
3. Check role permissions.
4. Implement minimal changes.
5. Verify API, UI, and business logic.
6. Run lint and production build.

Preserve existing functionality, data integrity, security, and UI consistency.

**Never implement interconnected business features as isolated UI changes.**

