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

Matty's database foundation uses TiDB Cloud Starter (MySQL-compatible), Drizzle ORM and Better Auth. Accounts and practice problems use the database. Lesson progress remains in browser storage.

1. Create a MySQL-compatible TiDB Cloud database and copy its connection URL from the TiDB dashboard.
2. Copy `.env.example` to `.env.local`, then set `DATABASE_URL` and a random `BETTER_AUTH_SECRET` (at least 32 characters). Keep `.env.local` private. Set `BETTER_AUTH_URL` to the app's origin.
3. Run `npm run db:push` to apply the Drizzle schema to the intended development database. Review the proposed changes before confirming.
4. Run `npm run dev`.

The auth endpoint is `/api/auth`. Never put database credentials into browser-side code or Git.


## Contributor access

Sign in and visit `/contribute` to find your account ID. Add these server-only settings to `.env.local` and to the production environment (without the brackets):

```env
CONTRIBUTOR_ADMIN_USER_IDS=<account-id>
```

For multiple contributors, separate account IDs with commas. Restart the server after changing environment settings. Contributors must sign in using an allowlisted account to upload or publish.

Images are normalized and stored in TiDB for now. The Markdown uses image URLs, so storage can move to S3 later. The editor publishes directly to the practice list; it does not yet support drafts, editing, or review.

The contributor tables are defined in Drizzle. To inspect their scoped setup on a new database, run `npx drizzle-kit push --config=drizzle.contribute.config.ts` and review the proposed changes before applying them.
