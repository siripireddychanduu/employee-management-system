# Employee Management System API Documentation

## Base URL

    http://localhost:5000/api

## Authentication

### Login

**POST** `/auth/login`

Request:

``` json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

Response:

``` json
{
  "success": true,
  "token": "jwt_token",
  "employee": {
    "_id": "...",
    "name": "Admin",
    "email": "admin@example.com",
    "role": "SUPER_ADMIN"
  }
}
```

## Employee APIs

### GET `/employees`

Roles: - SUPER_ADMIN - HR_MANAGER

### GET `/employees/:id`

Roles: - SUPER_ADMIN - HR_MANAGER - EMPLOYEE (Own Profile Only)

### POST `/employees`

Roles: - SUPER_ADMIN - HR_MANAGER

Restriction: - HR Manager cannot create SUPER_ADMIN.

### PUT `/employees/:id`

Roles: - SUPER_ADMIN - HR_MANAGER - EMPLOYEE (Own Profile Only)

Restriction: - HR Manager cannot assign SUPER_ADMIN.

### DELETE `/employees/:id`

Role: - SUPER_ADMIN only

### POST `/employees/upload/:id`

Content-Type:

    multipart/form-data

Form Field:

    profileImage

## Authorization Header

    Authorization: Bearer <JWT_TOKEN>

## HTTP Status Codes

  Code   Description
  ------ -----------------------
  200    Success
  201    Created
  400    Bad Request
  401    Unauthorized
  403    Forbidden
  404    Not Found
  500    Internal Server Error

## Role Permissions

  Feature                   Super Admin   HR Manager   Employee
  ------------------------- ------------- ------------ -------------
  Login                     ✅            ✅           ✅
  View Employees            ✅            ✅           Own Profile
  Create Employee           ✅            ✅           ❌
  Update Employee           ✅            ✅           Own Profile
  Delete Employee           ✅            ❌           ❌
  Assign Manager            ✅            ✅           ❌
  Create Super Admin        ✅            ❌           ❌
  Assign Super Admin Role   ✅            ❌           ❌
