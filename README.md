# Odoo-Hacathon2025-Expens-Management

```
project/

│──backend/
│
├── src/                              # Your source code
│   ├── functions/                    # All serverless functions (Lambda functions)
│   │   ├── auth/                     # Auth-related Lambda functions
│   │   │   ├── signUp.js             # Lambda for handling user signup
│   │   │   ├── login.js              # Lambda for handling user login
│   │   │   └── roleCheck.js          # Lambda for role-based access check
│   │   │
│   │   ├── expenses/                 # Expense-related Lambda functions
│   │   │   ├── submitExpense.js      # Lambda for submitting expenses
│   │   │   ├── approveExpense.js     # Lambda for approving expenses
│   │   │   └── getExpenses.js        # Lambda for fetching expenses
│   │   │
│   │   └── users/                    # User management-related Lambdas
│   │       ├── getUsers.js           # Lambda for fetching users
│   │       └── updateUserRole.js     # Lambda for updating user roles
│   │
│   ├── utils/                        # Shared utility functions
│   │   ├── db.js                     # Database connection logic (e.g., MongoDB or DynamoDB)
│   │   ├── jwt.js                    # Utility for handling JWT tokens
│   │   └── currencyConverter.js      # Utility for handling currency conversion logic
│   │
│   ├── config/                       # Configuration files for serverless functions
│   │   ├── serverless.yml            # Serverless framework configuration
│   │   ├── env.js                    # Environment variables and configuration
│   │   └── dbConfig.js               # Database configuration for serverless DB connections
│   │
├── tests/                            # Unit and integration tests for Lambdas
│   ├── auth.test.js                  # Tests for auth-related Lambda functions
│   ├── expenses.test.js              # Tests for expense-related Lambdas
│   └── users.test.js                 # Tests for user-related Lambdas
│
├── package.json                      # Node.js dependencies for the backend
└── README.md                         # Project documentation

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
