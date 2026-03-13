# FlixCod (inside flix-dev-console)

واجهة ويب حديثة كغلاف أنيق لطرفية (Terminal Shell) مع صندوق محادثة واحد ذكي، تدعم العربية والإنجليزية، وتعمل بنمط يعتمد على موارد جهاز المستخدم أولاً.

## Features
- واجهة ثنائية اللغة (AR/EN) + اتجاه RTL/LTR.
- ثيمين: داكن + أبيض باهت.
- صندوق محادثة واحد مع اقتراحات تفاعلية سريعة.
- ربط مزوّد النماذج (Open Code / Gemini / openclaw / Open Source) بعد تسجيل المستخدم.
- وضع "Local Device" لتقليل الاعتماد على السحابة ضمن الخطط المجانية.
- Backend starter API جاهز للتوسعة.

## Structure
- `frontend/`: React + Vite app.
- `backend/`: Express API starter.
- `docs/FREE_TIER_PLAN.md`: خطة المشروع والنشر ضمن الحسابات والخطط المجانية.

## Run locally
```bash
npm install
npm run dev:frontend
# in another terminal
npm run dev:backend
```

## Build
```bash
npm run build
```
