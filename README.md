# DefineShaper

An AI-powered fitness and body transformation coach: personalized calorie/macro
targets, workout plans you can customize exercise-by-exercise, food logging
(manual, search, or photo), an AI coach chat, and an AI body-transformation
preview.

This is a **real, deployable project** — not a demo. Read this whole file
before you launch; it tells you exactly what's done and what you still need
to do.

---

## 1. What's actually here

- `src/App.jsx` — the whole app (React, no router needed — it's a single-page tool)
- `api/*.js` — serverless backend functions. **Your Anthropic API key lives only
  here, never in the browser.**
- Everything is styled with real CSS (a mix of Tailwind + a custom stylesheet
  injected by the app itself) — no build-time surprises.

## 2. Get an Anthropic API key

1. Go to https://console.anthropic.com and create an API key.
2. Put real money/credits on that account — every AI coach message, every food
   photo scan, and every "estimate this food" call spends tokens on your bill.
   **This is the #1 thing people forget before launch.**

## 3. Run it locally

```bash
npm install
npm install -g vercel   # only needed once, globally
cp .env.example .env    # then paste your real key into .env
vercel dev              # serves both the frontend AND the /api functions together
```

Open the URL it prints (usually http://localhost:3000). Don't use `npm run dev`
alone for this project — that only serves the frontend, and the AI features
need the `/api` functions running alongside it, which `vercel dev` does for you.

## 4. Deploy it for real (recommended: Vercel)

This project is already structured for Vercel's zero-config `api/` folder
convention, so this is the least-friction path:

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → New Project → import the repo.
3. In the project's **Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your real key
4. Deploy. You'll get a `https://your-app.vercel.app` URL immediately, and can
   attach a custom domain for free in the same settings page.

Vercel's free tier is plenty for testing whether people like the app.

### If you specifically want it on a Google product

"Publish on Google" usually means one of two things:
- **Just get it live on the web** → Vercel above is genuinely the fastest,
  free path, and nothing about "Google" is required for that.
- **You specifically want Firebase Hosting** (an actual Google product) → it
  works too, but takes more setup: Firebase Hosting serves the static frontend,
  and you'd rewrite the three files in `api/` as Firebase Cloud Functions
  instead of Vercel functions (the function bodies are ~90% identical, just a
  different export shape). Ask me and I'll convert them if you want to go this
  route specifically.

## 5. What I already fixed / built in, so you don't ship with these bugs

- **The API key was never exposed to the browser.** The original prototype
  called Anthropic directly from the browser with no key — that only worked
  inside Claude's own artifact preview, which quietly injects the request.
  On a real domain it would either fail outright or (worse) require putting
  your API key in client-side JS where anyone can steal it from devtools and
  run up your bill. Fixed: all AI calls now go through `/api/*`, which holds
  the key server-side only.
- **Data now actually persists.** Everything (profile, meals, weight log,
  workouts, chat) is saved to `localStorage` and correctly rolls over at
  midnight, so "today's meals" don't silently carry into tomorrow.
- **The fake "tap to unlock Premium" toggle is gone.** It would have let any
  real user unlock paid features for free. It's now a waitlist email capture
  (`/api/waitlist` — currently just logs to your function logs; wire it to a
  Google Sheet, Airtable, or Mailchimp before you actually launch — see the
  TODO comment in that file).
- **Basic rate limiting** on all three AI endpoints (per-IP, resets daily) so
  a single abusive visitor can't blow your API budget in an afternoon. It's a
  best-effort in-memory limiter, good enough for early testing — see the
  comment in `api/_ratelimit.js` for how to upgrade it later.
- **Calorie safety floors** are enforced (never recommends below ~1200/1500
  kcal regardless of inputs) and the AI coach's system prompt explicitly
  refuses dangerously low-calorie advice.

## 6. What's still on you before a real public launch

These are genuine gaps — not bugs, just things an MVP validation build doesn't
need but a real launch does:

- **Real accounts.** Right now "signing up" just fills local device storage —
  there's no login, so a user's data doesn't follow them to a new phone or
  browser. Fine for testing interest; not fine for a real launch. You'll want
  real auth (Clerk, Supabase Auth, or Firebase Auth are all fast to add) plus
  a real database once people are trusting you with their data.
- **Real payments.** The Premium features are currently just a waitlist. To
  actually charge money: use Stripe if this stays a website, or Apple's
  StoreKit / Google Play Billing if you wrap it as a native app (see below) —
  app stores *require* their own in-app-purchase system for digital
  subscriptions; you cannot use Stripe inside a native iOS/Android app for this.
- **A privacy policy and terms of service, hosted at a public URL.** I've
  drafted both (`PRIVACY_POLICY.md`, `TERMS.md`) — read them, edit the
  placeholders (your business name, contact email, jurisdiction), and publish
  them at real URLs (a simple page on your site is fine). Both app stores
  require a live privacy policy URL before they'll even let you submit, and
  you're collecting health data (weight, age, goals) so this isn't optional.
- **The AI body-transformation feature is a stylized photo filter, not real AI
  image generation** — it's already labeled that way in the UI, which is the
  right call given how sensitive body-image features are. Don't quietly change
  that copy to imply more than it does.
- **Content moderation on the photo upload.** Right now any image can be sent
  to the food scanner / transformation feature. Before public launch, consider
  what happens if someone uploads something inappropriate — at minimum,
  a report/flag mechanism, and check Anthropic's usage policies for your plan.

## 7. Going from website → app store

A website (even a great one) isn't an app store listing. Two real paths:

1. **PWA (Progressive Web App) first** — cheapest, fastest, and honestly the
   right first step: add a manifest + service worker, and people can
   "Add to Home Screen" on iOS/Android and get an app-like icon and full-screen
   experience with zero app-store review. Great for validating demand before
   you invest in the next step.
2. **Wrap it natively with Capacitor** (https://capacitorjs.com) — takes this
   exact React app and wraps it as a real iOS/Android binary you can submit to
   both stores, while still being able to use native features (push
   notifications, real camera APIs, StoreKit/Play Billing for payments) later.
   This is the standard path for exactly this situation (React web app → app
   store) and is much less work than rewriting in React Native.

Do **not** submit a bare "Free build" and "Premium build" as two separate app
store listings — reviewers will very likely reject one as a duplicate. Ship
one app with a real paywall (App Store/Play Billing) once you're ready to charge.

## 8. Before you tell anyone the URL

- [ ] Real `ANTHROPIC_API_KEY` set in Vercel, with billing/limits you're
      comfortable with
- [ ] Tested the AI coach, food scanner, and food-estimate flows end-to-end
      on the deployed URL (not just locally)
- [ ] Privacy Policy and Terms published at real URLs, and edited (not just
      the placeholders I wrote)
- [ ] Decided what `/api/waitlist` actually does with the emails it collects
- [ ] Tried it on an actual phone, not just desktop Chrome
