# Jaswanth

Personal site: portfolio, writing log (Notion), and contact.

```bash
npm install
cp .env.example .env
npm run dev
```

Set `SECRET_TOKEN` and `DATABASE_ID` in `.env` for local `npm run dev`.

On **Netlify**: Site configuration → Environment variables → add the same two keys, then redeploy. Without them the blog section renders but posts cannot load.
