# Expense Manager (MERN + Tailwind)

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18-61dafb.svg?logo=react&logoColor=white)](https://react.dev)
[![Express](https://img.shields.io/badge/express-4-black.svg)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/mongodb-Mongoose-47A248.svg?logo=mongodb&logoColor=white)](https://mongoosejs.com)
[![Vite](https://img.shields.io/badge/vite-5-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-3-38B2AC.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

A full-stack expense management system purpose-built for hackathons and rapid development. It supports company bootstrap on signup, role-based access (Admin, Manager, Employee), multi-step and conditional approval flows (percentage, specific approver, hybrid), receipts OCR, currency conversion with caching, dashboards per role, and a complete admin override + history view.


## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Run](#run)
- [Key Endpoints](#key-endpoints)
- [Data Model Overview](#data-model-overview)
- [Approval Flow Rules](#approval-flow-rules)
- [OCR](#ocr)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)


## Features
- Authentication & Company Bootstrap
  - First signup auto-creates Company (with default currency from country/currency input) and Admin user
  - JWT auth (email/password)
- Roles & User Management (Admin)
  - Create Employees & Managers
  - Change roles (Employee ↔ Manager)
  - Define manager relationships for employees
- Expense Submission (Employee)
  - Submit expenses in any currency; auto-converts to company currency (rates cached daily)
  - Attach receipts (images) and see OCR-extracted fields
  - My Expenses list with status and details
- Approval Workflow (Manager/Admin)
  - Manager-first option, multi-level sequences (Manager → Finance/CFO → Director, etc.)
  - Conditional rules: percentage approvals, specific approver auto-pass, hybrid (percentage OR specific approver)
  - Approvals page for pending items (with optional comments)
  - Admin can view company-wide approvals, approve/reject any assignment, or force override
- Admin Views
  - Admin Settings (users, manager relations, flow builder + activation)
  - Approvals (company-wide, with assignee visibility)
  - History: all submitted expenses with filter and force override
- Currency & Rates
  - REST Countries for country→currency lookup
  - exchangerate-api for live rates; cached daily and used by default (with live fallback)




## Architecture
MERN stack with Vite + Tailwind on the client and Express + Mongoose on the server.

- Client (Vite + React + Tailwind)
  - Auth, role-protected routes (Employee/Manager/Admin)
  - NavBar dynamically reflects role (Admin does not see “Submit Expense”)
  - Approvals with optional comments; image receipts previews
  - Admin History and All Expenses with force override

- Server (Express + Mongoose)
  - Company, User, Expense, ApprovalFlow, ApprovalAssignment, ExchangeRate models
  - On expense submission:
    1) Convert to company currency
    2) Attach active flow
    3) Create first-step assignments
    4) Evaluate-and-advance engine
  - Approval engine supports percentage/specific/hybrid rules and sequences
  - Currency: cached-first conversion, live fallback


## Folder Structure
```
expense-manager/
├─ server/
│  ├─ src/
│  │  ├─ models/               # Company, User, Expense, ApprovalFlow, ApprovalAssignment, ExchangeRate
│  │  ├─ routes/               # auth, users, expenses, approvals, admin, utils, ocr, me
│  │  ├─ services/             # approvalEngine, currency, ocr
│  │  ├─ middleware/           # auth, role guard
│  │  ├─ config/               # env loader
│  │  ├─ db/                   # mongoose
│  │  ├─ app.js, server.js
│  ├─ .env.example
│  ├─ package.json
│
├─ client/
│  ├─ src/
│  │  ├─ components/           # NavBar, ProtectedRoute, RoleRoute
│  │  ├─ pages/                # Login, Signup, Dashboard, SubmitExpense, Approvals, Admin, TeamExpenses, ExpensesMine, AdminHistory, etc.
│  │  ├─ lib/api.js            # axios with auth header
│  │  ├─ main.jsx, App.jsx
│  ├─ .env.example
│  ├─ index.html
│  ├─ package.json
│
├─ docs/
│  └─ images/                  # put screenshots here
└─ README.md
```


## Getting Started
### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas connection string)

### Windows (PowerShell)
1) Clone and install
```
# Server deps
Set-Location server
npm install

# Client deps
Set-Location ..\client
npm install
```

2) Configure environment files
- Server: copy `server/.env.example` to `server/.env` and edit if needed
- Client: copy `client/.env.example` to `client/.env`

3) Run
```
# Terminal 1 (server)
Set-Location server
npm run dev

# Terminal 2 (client)
Set-Location client
npm run dev
```
- Server: http://localhost:4000
- Client: http://localhost:5173

4) First signup creates Company + Admin
- Use Signup page to create your first Admin and Company (enter a country or currency code like "INR"/"USD").


## Configuration
### Server `.env`
```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/expense_manager
JWT_SECRET=change-me
OCR_ENABLED=false
```
- Set `OCR_ENABLED=true` to enable OCR endpoint

### Client `.env`
```
VITE_API_URL=http://localhost:4000/api
```


## Run
- Development: `npm run dev` (both server and client)
- Build (client): `npm run build` and `npm run preview`


## Key Endpoints
- Auth
  - POST `/api/auth/signup` → bootstrap company + admin
  - POST `/api/auth/login`
- Users (Admin)
  - GET `/api/users` → list with manager info
  - POST `/api/users` → create user (email, password, role)
  - POST `/api/users/manager-relations` → set employee manager
  - PATCH `/api/admin/users/:id` → change role
- Expenses
  - POST `/api/expenses` → create (supports receipts: [])
  - GET `/api/expenses/mine` → my expenses
  - GET `/api/expenses/team` → manager/admin: team expenses
  - GET `/api/expenses/all` → admin: all company expenses
  - GET `/api/expenses/:id` → expense + approval history
- Approvals
  - GET `/api/approvals/pending` → manager/admin pending (admin supports `?all=1`)
  - POST `/api/approvals/:assignmentId/approve` (comment optional)
  - POST `/api/approvals/:assignmentId/reject` (comment optional)
- Admin
  - POST `/api/admin/approval-flows` → create flow (steps + rules)
  - POST `/api/admin/approval-flows/:id/activate` → activate
  - POST `/api/admin/expenses/:id/override` → force approve/reject
  - GET  `/api/admin/history` → all company expenses (for History page)
- Utils / OCR
  - GET `/api/utils/countries`
  - GET `/api/utils/exchange-rates/:base`
  - POST `/api/ocr/receipts` → OCR parse (returns merchant/amount/date/description), requires `OCR_ENABLED=true`


## Data Model Overview
- Company: name, countryCode, currencyCode, activeFlow
- User: email, passwordHash, role (ADMIN/MANAGER/EMPLOYEE), profile.manager, company
- Expense: employee, company, amounts (original + company), currency, category, description, date, status, lines, receipts, flow, stepOrder
- ApprovalFlow: steps (order, approvers like `MANAGER`, `USER:<id>`, `ROLE:MANAGER`), rules (PERCENTAGE, SPECIFIC_APPROVER, HYBRID)
- ApprovalAssignment: expense, stepId, approver, status, comment, decidedAt
- ExchangeRate: cached rates (base, date, raw JSON)


## Approval Flow Rules
- Percentage rule: e.g., 60% of approvers must approve a step
- Specific approver rule: e.g., if CFO approves, step auto-passes
- Hybrid: percentage OR specific approver
- Multi-step sequences: define steps in order; workflow advances as each step is satisfied


## OCR
- Uses `tesseract.js` to parse receipt text
- Returns structured data (merchant, amount, date, description)
- Client preview uses FileReader to show image and submit as an embedded receipt (data URL) along with the expense


## Troubleshooting
- Admin Approvals shows empty
  - Ensure employee has a manager assigned (Admin → Set Manager)
  - Ensure the company has an active flow (Admin → Approval Flow → Activate)
  - Refresh after a new submission; Admin can also use History to see all submissions
- Currency conversion fails
  - Check network for exchangerate API; fallback is implemented, but base/target currency must exist
- OCR disabled
  - Set `OCR_ENABLED=true` in `server/.env` and restart server


## Roadmap
- Role groups like FINANCE/DIRECTOR (ROLE:FINANCE) with UI management
- Advanced filters (date range, employee, amount) on History/Approvals
- File storage for receipts (S3/local disk) instead of data URLs
- i18n and multi-currency reports


## License
MIT (You may add a LICENSE file to the repository.)
