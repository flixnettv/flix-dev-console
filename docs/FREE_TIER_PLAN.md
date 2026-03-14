# FlixCod Free-Tier Project Plan

## الهدف
بناء تطبيق FlixCod كواجهة طرفية حديثة بذكاء تفاعلي، مع أولوية تشغيل على جهاز المستخدم، وتكامل سحابي اختياري عند الحاجة.

## توزيع الأدوار على حساباتك
- **GitHub**: إدارة الكود + CI + إصدار النسخ.
- **Supabase**: Auth + Database + تخزين إعدادات الربط.
- **Vercel**: استضافة الواجهة الأمامية (Primary Web).
- **Railway/Render**: استضافة الـ API الخلفي (Express).
- **Cloudflare**: DNS + SSL + WAF + Caching Rules.
- **Docker Hub**: صورة backend للنقل السريع.

## حدود الخطط المجانية (عملي)
1. التشغيل الافتراضي Local Device Mode.
2. منع أي استدعاء كثيف للسحابة بدون تسجيل دخول.
3. حفظ المحادثات المختصرة فقط (Retention محدود).
4. عمل rate limit بسيط لكل مستخدم لاحقاً.

## خطة التنفيذ
- **M1 (جاهزة الآن)**: UI كامل + i18n + Theme + ربط مزود + backend + DB schema.
- **M2**: سياسات RLS متقدمة وربط مستخدم Supabase الحقيقي مع السجلات.
- **M3**: موصلات Gemini/Open-source + Queue + Usage stats.
- **M4**: قوالب prompts + تصدير جلسات + تحسين performance.

## نشر فوري
1. شغّل migration SQL في Supabase.
2. انشر backend على Railway/Render واضبط env.
3. انشر frontend على Vercel واضبط env + rewrite `/api/*`.
4. اربط الدومين عبر Cloudflare وأضف WAF rules.
