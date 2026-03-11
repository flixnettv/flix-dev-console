# flix-dev-console
flixnettv/flix-dev-console
📦 البنية الكاملة:
flix-dev-console/
├── backend/
│   ├── src/
│   │   ├── core/
│   │   │   ├── server.js
│   │   │   └── router.js
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   └── auth.routes.js
│   │   │   ├── projects/
│   │   │   │   └── projects.routes.js
│   │   │   ├── deploy/
│   │   │   │   └── deploy.routes.js
│   │   │   ├── database/
│   │   │   │   └── database.routes.js
│   │   │   ├── docker/
│   │   │   │   └── docker.routes.js
│   │   │   ├── logs/
│   │   │   │   └── logs.routes.js
│   │   │   ├── domains/
│   │   │   │   └── domains.routes.js
│   │   │   └── ai/
│   │   │       └── ai.routes.js
│   │   └── config/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── projects/
│   │   │   │   └── Projects.jsx
│   │   │   ├── deploy/
│   │   │   │   └── Deploy.jsx
│   │   │   ├── database/
│   │   │   │   └── Database.jsx
│   │   │   ├── logs/
│   │   │   │   └── Logs.jsx
│   │   │   ├── domains/
│   │   │   │   └── Domains.jsx
│   │   │   ├── ai/
│   │   │   │   └── AI.jsx
│   │   │   └── settings/
│   │   │       └── Settings.jsx
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── i18n/
│   │   │   ├── ar.js
│   │   │   ├── en.js
│   │   │   └── config.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── package.json
├── .env
├── .env.example
├── .gitignore
└── README.md
