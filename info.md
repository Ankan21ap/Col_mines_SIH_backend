frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── layouts/
│ ├── services/
│ │ └── api.js
│ ├── hooks/
│ ├── context/
│ ├── utils/
│ ├── assets/
│ ├── App.jsx
│ └── main.jsx
├── public/
├── package.json
├── vite.config.js
└── .env

backend/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Mine.js
│ │ ├── Compliance.js
│ │ ├── Inspection.js
│ │ ├── Violation.js
│ │ ├── CorrectiveAction.js
│ │ ├── Contractor.js
│ │ ├── Document.js
│ │ ├── Notification.js
│ │ └── AuditLog.js
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ │ ├── auth.js
│ │ ├── rbac.js
│ │ └── validation.js
│ ├── services/
│ │ ├── complianceService.js
│ │ ├── riskService.js
│ │ ├── notificationService.js
│ │ └── documentService.js
│ ├── utils/
│ └── app.js
├── package.json
└── .env
