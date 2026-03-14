# FlixCod

تطبيق ويب حديث كـ **واجهة طرفية ذكية** (Terminal Shell) بصندوق محادثة واحد، ثنائي اللغة (العربية/الإنجليزية)، مع وضع تشغيل يعتمد على موارد جهاز المستخدم أولاً.

## ما تم تجهيزه
- Frontend: React + Vite + ثيمات + i18n + Provider Linking.
- Auth: تكامل Supabase Auth (Magic Link) من الواجهة.
- Backend: Express API مع حفظ رسائل المحادثة في Supabase.
- Database: Migration SQL جاهزة لـ Supabase.
- Deploy: ملفات وإعدادات مساعدة لـ Vercel + Cloudflare + Railway/Render.

## بنية المشروع
- `frontend/` تطبيق الواجهة.
- `backend/` واجهة API.
- `supabase/migrations/001_init.sql` مخطط قاعدة البيانات.
- `vercel.json` إعداد نشر الواجهة على Vercel.
- `cloudflare/README.md` خطوات تهيئة Cloudflare.
- `.env.example` جميع المتغيرات المطلوبة.

## التشغيل المحلي
```bash
npm install
cp .env.example .env
# حدّث القيم داخل .env
npm run dev:backend
npm run dev:frontend
```

## متغيرات البيئة
- Frontend:
  - `VITE_API_BASE_URL`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Backend:
  - `PORT`
  - `CORS_ORIGIN`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

## خطوات نشر سريعة
1. **Supabase**
   - أنشئ مشروع.
   - نفّذ SQL من `supabase/migrations/001_init.sql`.
   - انسخ `URL` و`anon key` و`service_role key`.

2. **Backend (Railway أو Render)**
   - انشر مجلد `backend` أو المستودع كامل مع start command: `npm run start:backend`.
   - اضبط env الخاصة بالـ backend.

3. **Frontend (Vercel)**
   - انشر المستودع.
   - Build command: `npm run build`
   - Output directory: `frontend/dist`
   - اضبط env الخاصة بالواجهة.
   - عدّل `vercel.json` لاستخدام دومين الـ backend الحقيقي في rewrite الخاص بـ `/api/*`.

4. **Cloudflare**
   - اربط الدومين بـ Vercel (app) وRailway/Render (api).
   - فعّل SSL/WAF و rules المقترحة في `cloudflare/README.md`.
