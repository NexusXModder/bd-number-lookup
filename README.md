# 🇧🇩 BD Number Lookup — Premium

A production-ready Next.js website for Bangladesh mobile-number operator prefix lookup, with a public REST API.

**Built by @NexusXModder — Araf**

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Netlify Next.js runtime

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## API

```text
GET /api/lookup?number=01712345678
```

Example:

```bash
curl "https://YOUR-SITE.netlify.app/api/lookup?number=01712345678"
```

The API returns the original allocated prefix/operator based on the included reference table.

> Mobile Number Portability (MNP) means the original prefix does not necessarily prove the current carrier.

## GitHub → Netlify

1. Create a new GitHub repository.
2. Upload/push **all files in this folder**, including `package.json`, `app/`, `components/`, `public/` (when present), and `netlify.toml`.
3. In Netlify, choose **Add new project → Import an existing project → GitHub**.
4. Select the repository.
5. Netlify should detect the Next.js setup automatically.
6. Build command: `npm run build`.
7. Deploy.

The repository is configured with `@netlify/plugin-nextjs`, so Next.js routes such as `/api/lookup` are handled by Netlify's Next.js runtime.

## Important data/privacy note

The included API uses the prefix reference supplied for this project. It does not expose private subscriber identity information.

Do not advertise claims such as guaranteed sub-100ms response time, current MNP carrier detection, or access to BTRC private subscriber databases unless you have independently verified and are authorized to make those claims.

## Production checklist

Before public launch:

- Replace placeholder statistics with real counters.
- Add a real privacy policy and contact information.
- Verify every operator prefix against an authoritative current source.
- Add rate limiting if the API becomes publicly popular.
- Add monitoring/error reporting.
- If you introduce API keys, store secrets only in Netlify environment variables.
