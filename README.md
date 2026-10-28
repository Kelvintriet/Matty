This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database setup (development)

Matty's database foundation uses TiDB Cloud Starter (MySQL-compatible), Drizzle ORM and Better Auth. The existing learning and practice screens still use their prototype data and browser storage; the database and login are not connected to those screens yet.

1. Create a MySQL-compatible TiDB Cloud database and copy its connection URL from the TiDB dashboard.
2. Copy `.env.example` to `.env.local`, then set `DATABASE_URL` and a random `BETTER_AUTH_SECRET` (at least 32 characters). Keep `.env.local` private. Set `BETTER_AUTH_URL` to the app's origin.
3. Run `npm run db:push` to apply the Drizzle schema to the intended development database. Review the proposed changes before confirming.
4. Run `npm run dev`.

The auth endpoint is `/api/auth`; the sign-in interface and database-backed problem flows are still to be implemented. Never put database credentials into browser-side code or Git.
