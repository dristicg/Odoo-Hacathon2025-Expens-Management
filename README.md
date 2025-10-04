# Odoo-Hacathon2025-Expens-Management

```
project/
│
├── backend/
│   ├── controllers/          # Controller functions for handling business logic
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   └── userController.js
│   ├── models/               # Database models
│   │   ├── Company.js
│   │   └── User.js
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/           # Middleware (auth and role-based access)
│   │   ├── auth.js
│   │   └── role.js
│   ├── config/               # Configurations for DB and environment variables
│   │   ├── db.js
│   │   └── config.js
│   ├── controllers/          # Controller functions for handling business logic
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   └── userController.js
│   ├── server.js             # Express server entry point
│   ├── .env                  # Environment variables (JWT_SECRET, DB_URI)
│   └── package.json          # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── assets/           # Static assets like images, icons, fonts
│   │   ├── components/       # Reusable React components
│   │   │   ├── Navbar.js     # Navigation bar for the application
│   │   │   ├── Sidebar.js    # Sidebar for navigation (Admin, Manager, Employee)
│   │   │   ├── ExpenseForm.js  # Form for submitting expenses (Employee)
│   │   │   └── ExpenseList.js  # List of expenses (Admin, Manager, Employee)
│   │   ├── context/          # React Context for managing global state (user authentication)
│   │   │   └── AuthContext.js
│   │   ├── pages/            # React pages (views) for each route
│   │   │   ├── Login.js      # Login page
│   │   │   ├── Dashboard.js  # Main dashboard (Admin, Manager, Employee)
│   │   │   ├── AdminDashboard.js  # Admin dashboard
│   │   │   ├── ManagerDashboard.js # Manager dashboard
│   │   │   └── EmployeeDashboard.js # Employee dashboard
│   │   ├── services/         # API calls (to interact with backend)
│   │   │   └── api.js        # Utility for making API requests
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # Entry point for React app
│   │   └── .env              # Environment variables for frontend (API_URL)
│   └── package.json          # Frontend dependencies
│
└── .gitignore                # Git ignore file
```
