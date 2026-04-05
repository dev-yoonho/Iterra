# Iterra Payload CMS Audit

## Scope
- Collections: `users`, `media`, `tags`, `development-posts`, `career-posts`, `life-posts`
- Globals: `site-settings`, `home-sections`, `agent-signals`
- Access: authenticated-only write flows, public read flows, first-user bootstrap
- Operational boundaries: slug generation, DB env wiring, runtime fallback behavior

## Current Structure
- `users`
  - Payload auth collection
  - `create` allowed only when there is no user yet, or when already authenticated
  - `read/update/delete` require authentication
- `development-posts`, `career-posts`, `life-posts`
  - share a common base schema
  - public reads limited to `status = published`
  - create/update/delete require authentication
  - common fields: `title`, `slug`, `summary`, `cover`, `publishedAt`, `status`, `tags`, `body`, `seo`
- `tags`
  - public read
  - authenticated write
- `media`
  - public read
  - authenticated write
  - upload enabled with generated card/square/og image sizes
- Globals
  - `site-settings`, `home-sections`, `agent-signals` are publicly readable and authenticated-only for update

## Findings

### 1. Access model is coherent for a single-owner editorial site
- Public visitors can read published posts and public globals.
- Admin-only mutations are centralized through `authenticatedOnly`.
- `users.create` is guarded by `firstUserOrAuthenticated`, which is appropriate for first-admin bootstrap in a private CMS.

### 2. First-user bootstrap is valid, but concurrency remains a known edge case
- Current logic checks whether any user exists, then allows unauthenticated `create`.
- This is acceptable for local bootstrap and most single-admin setups.
- Residual risk: two concurrent first-user requests could race before the first row is committed.
- Recommendation: acceptable for v1. Revisit only if admin creation is exposed beyond trusted setup flow.

### 3. Public content visibility depends on custom `status`, not Payload drafts
- This is simple and readable.
- It does mean editorial state is managed by a custom field rather than Payload's native draft/versioning system.
- Recommendation: keep as-is for v1. Consider Payload drafts only if scheduled publishing, previews, or revision history become necessary.

### 4. `publishedAt` could previously be left empty on published entries
- Risk: sorting and archive order become unstable for published posts.
- Applied change: when a post is saved with `status = published` and no `publishedAt`, the collection now assigns the current timestamp automatically.

### 5. Payload env wiring previously allowed silent fallback values
- Risk: if `DATABASE_URL` or `PAYLOAD_SECRET` were missing in production, Payload could still boot with local fallback values.
- Applied change: Payload now allows fallback values only outside production, and throws a clear startup error in production when required env vars are missing.
- Public site fallback behavior remains unchanged: content helpers still return safe defaults when Payload runtime env is absent or reads fail.

### 6. Slug behavior is deterministic, but collision handling is editor-driven
- `slugField` lowercases text, removes common punctuation, converts `&` to `and`, and collapses spaces into hyphens.
- The field is `unique: true`, so uniqueness is enforced at the collection level.
- Residual risk: there is no automatic suffixing such as `-2`, `-3` on collisions. Editors will need to resolve duplicates manually.
- Note: Korean titles will remain Korean in the slug unless the editor overrides it manually. This is fine if Korean URLs are acceptable for the site.

### 7. Media is publicly readable by design
- This is required for public post covers and OG assets to resolve cleanly.
- Residual risk: unpublished assets in `media` are also publicly readable through the API/static URLs.
- Recommendation: acceptable for v1 if the CMS is used only by the site owner and uploads are publication-safe. If private asset staging becomes necessary, media access needs a stronger policy.

### 8. Error handling in read-side helpers is intentionally fail-soft
- `src/lib/content.ts` returns fallback content or empty arrays when Payload is unavailable.
- This keeps the public site online during setup or temporary DB outages.
- Residual risk: failures are silent from an operator perspective.
- Recommendation: add structured logging once runtime validation is available.

## Verification Checklist Before DB Connection
- Confirm `.env.local` includes:
  - `DATABASE_URL`
  - `PAYLOAD_SECRET`
  - `NEXT_PUBLIC_SERVER_URL`
- Confirm `DATABASE_URL` points to the intended Supabase/Postgres instance.
- Confirm `PAYLOAD_SECRET` is a long random secret, not the development fallback.
- Confirm the deployment environment sets the same variables explicitly.
- Confirm `/admin` and `/api/*` are not expected to run without DB credentials.

## Verification Checklist After DB Connection
- Start the app and open `/admin`.
- Create the first admin user while unauthenticated.
- Verify a second unauthenticated user cannot be created after bootstrap.
- Create one draft post in each collection and verify:
  - draft is visible in admin
  - draft is not visible on public listing/detail pages
- Publish a post without manually setting `publishedAt` and verify:
  - `publishedAt` is auto-filled
  - public listing sort order is correct
- Upload one media item and verify:
  - image sizes are generated
  - related cover images resolve on the public site
- Update each global and verify the public pages reflect the change.
- Confirm Giscus and other public surfaces do not require CMS auth.

## Suggested Follow-ups
- Add operator-visible logging around `src/lib/content.ts` failure paths.
- Add URL validation for social links and project links if malformed data becomes a content issue.
- Consider a lightweight seed script for initial tags/site settings after Node runtime is available.
