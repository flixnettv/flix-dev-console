# FlixCod (inside flix-dev-console)

واجهة ويب حديثة كغلاف أنيق لطرفية (Terminal Shell) مع صندوق محادثة ذكي، تدعم العربية والإنجليزية، وتعمل بنمط يعتمد على موارد جهاز المستخدم أولاً.

## Features
- واجهة ثنائية اللغة (AR/EN) + اتجاه RTL/LTR.
- ثيمين: داكن + فاتح.
- تسجيل مجاني إلزامي قبل استخدام أي أداة.
- صندوق محادثة بتصميم Mobile-First وأزرار لمس محسنة.
- ربط مزوّد النماذج بعد تسجيل المستخدم.
- Backend starter API جاهز للتوسعة.

## Structure
- `frontend/`: React + Vite app.
- `backend/`: Express API starter (file DB by default).
- `.dev`: مهام تشغيل/فحص محلي موحدة.
- `docs/FREE_TIER_PLAN.md`: خطة المشروع والنشر ضمن الخطط المجانية.

## Local development
```bash
npm install
./.dev up
```

## Quick checks
```bash
./.dev check
npm run build
```

## Environment variables
انسخ من الملفات:
- `.env.example`
- `frontend/.env.example`
- `backend/.env.example`

المتغيرات المهمة:
- `VITE_API_BASE_URL`: رابط الـ API المستخدم من الواجهة.
- `PORT`: منفذ الباكند.
- `DB_FILE`: مسار ملف قاعدة البيانات (لمنع التعارض بين البيئات).
- `CORS_ORIGIN`: رابط/نطاق مسموح للواجهة.

## Deployment configs (ready)
- **Vercel**: `vercel.json` (Frontend + API rewrite placeholder).
- **Netlify**: `netlify.toml` (publish + redirects).
- **Cloudflare Pages**: `wrangler.toml`.
- **Railway**: `railway.json` + `Procfile` (backend start command).

> قبل النشر: غيّر `YOUR_BACKEND_DOMAIN` في `vercel.json` و`netlify.toml` و`wrangler.toml` إلى رابط الباكند الفعلي.

## Database isolation strategy
- Local dev: `DB_FILE=data/dev.db.json` عبر `.dev up`.
- Local checks/CI: `DB_FILE=data/dev-check.db.json` عبر `.dev check`.
- Production: اضبط `DB_FILE` لكل منصة على مسار مستقل.
