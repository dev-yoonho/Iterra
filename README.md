# Iterra

Iterra is a Korean-first personal site for development notes, career milestones, and everyday records. It is built with `Next.js`, `Payload`, and `PostgreSQL`, with subtle world-building details that can later grow into agent-like presences.

## Stack

- `Next.js App Router`
- `Payload CMS` with self-hosted admin
- `PostgreSQL` via `@payloadcms/db-postgres`
- `Vercel`-friendly deployment
- `Giscus` comments

## Local Setup

1. Install `Node.js 20.9+`.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local` and fill in the values.
4. Run `npm run dev`.
5. Visit `http://localhost:3000/admin` to create the first admin user.

## Useful Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run generate:types`
- `npm run generate:importmap`

## Notes

- The public site is designed to render even before Payload is fully configured, using safe fallbacks.
- Once Payload is connected, the public pages read directly from the CMS collections and globals.
- The default `dev` script uses plain `next dev` because `--no-server-fast-refresh` caused repeated HMR WebSocket handshake errors locally.
- A fallback `dev:payload` script keeps Payload's recommended `--no-server-fast-refresh` variant for comparison when debugging Payload-specific dev behavior.
- Korean implementation notes are available in [guide/iterra-v1-guide-ko.md](./guide/iterra-v1-guide-ko.md).
- Local run and Vercel deployment checks are in [guide/local-run-and-deploy-checklist-ko.md](./guide/local-run-and-deploy-checklist-ko.md).
