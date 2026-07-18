# Employee Management System

A full-stack Employee Management System built with **React, TypeScript,
Node.js, Express, and MongoDB**.

## Features

### Authentication

-   JWT Authentication
-   Secure Login
-   Password Hashing using bcrypt

### Role-Based Access Control (RBAC)

#### Super Admin

-   Create Employees
-   Update Employees
-   Delete Employees
-   View All Employees
-   Assign Managers
-   Create HR Managers
-   Create Super Admins

#### HR Manager

-   Create Employees
-   Update Employees
-   View Employees
-   Assign Managers

Restrictions: - Cannot Delete Employees - Cannot Create Super Admin -
Cannot Assign Super Admin Role

#### Employee

-   View Own Profile
-   Update Own Profile

## Employee Management

-   Add Employee
-   Edit Employee
-   Delete Employee
-   Employee Details
-   Upload Profile Image
-   Assign Manager

## Dashboard

-   Total Employees
-   Active Employees
-   Department Statistics
-   Employee Distribution

## Additional Features

-   Search
-   Filtering
-   Sorting
-   Pagination
-   CSV Export
-   Organization Hierarchy
-   Loading Spinner
-   Empty State
-   Toast Notifications
-   Delete Confirmation Dialog

## Tech Stack

### Frontend

-   React
-   TypeScript
-   Tailwind CSS
-   React Router
-   Axios
-   React Hot Toast
-   SweetAlert2

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   bcrypt
-   Multer

## Installation

### Clone Repository

``` bash
git clone https://github.com/yourusername/employee-management-system.git
```

### Backend

``` bash
cd backend
npm install
npm run dev
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```


## Environment Variables

``` env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Authentication

Include the JWT token in protected requests:

    Authorization: Bearer <JWT_TOKEN>

## RBAC

  Role          Create   Update        Delete   View
  ------------- -------- ------------- -------- -------------
  Super Admin   ✅       ✅            ✅       ✅
  HR Manager    ✅       ✅            ❌       ✅
  Employee      ❌       Own Profile   ❌       Own Profile

## API Documentation

See `API_DOCUMENTATION.md`

## Future Enhancements

-   Attendance Management
-   Leave Management
-   Payroll
-   Email Notifications
-   Audit Logs

## Author

Chandu
