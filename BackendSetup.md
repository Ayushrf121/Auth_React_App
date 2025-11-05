# 🧠 AUTHENTICATION BACKEND SETUP (Node.js + Express + MongoDB)

This document explains how we created a secure **authentication backend** using **Node.js, Express, MongoDB, JWT**, and other important npm packages.

---

## 🗂 1. Directory Structure

AUTH_REACT_APP/
│
├── backend/
│ ├── Controllers/
│ │ └── AuthController.js
│ ├── Middlewares/
│ │ ├── AuthValidation.js
│ │ └── JWTAuth.js
│ ├── Models/
│ │ ├── Users.js
│ │ └── db.js
│ ├── Routes/
│ │ ├── AuthRouter.js
│ │ └── ProductRouter.js (optional)
│ ├── .env
│ └── index.js
│
├── frontend/
│ ├── pages/
│ │ ├── Signup.jsx
│ │ ├── Login.jsx
│ │ └── Home.jsx
│ ├── util.jsx
│ ├── App.jsx
│ └── index.css
│
└── package.json

---

## ⚙️ 2. NPM Packages Installed

Run these commands inside the **backend** folder:

```bash
npm init -y
npm install express mongoose bcrypt jsonwebtoken dotenv joi cors
```

| Package                | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| **express**            | Framework for building APIs                        |
| **mongoose**           | MongoDB object modeling tool                       |
| **bcrypt**             | Password hashing for security                      |
| **jsonwebtoken (JWT)** | Creates and verifies tokens for authentication     |
| **dotenv**             | Loads environment variables from `.env`            |
| **joi**                | Validates user input (e.g., signup/login forms)    |
| **cors**               | Enables cross-origin requests (used with frontend) |

```
# 🔐 3. Environment Variables (.env)
## Create a .env file inside the backend/ folder:
```bash

MONGO_CONN = mongodb://127.0.0.1:27017/authentication_db
JWT_Secret = mysupersecretkey
PORT = 8080

```
# 🧩 4. Models — Users.js
* Located in backend/Models/Users.js

# 🧠 5. Database Connection — db.js
* Located in backend/Models/db.js

# 🧱 6. Controllers — AuthController.js
* Handles signup and login requests.

# 🧾 7. Middleware 
* AuthValidation.js (Input Validation using Joi)
* JWTAuth.js (Authorization Middleware)

# 🌐 8. Routes — AuthRouter.js
* Routing done by this

# 🚀 9. Server Entry File — index.js

# ⚡ 10. Common HTTP Status Codes Used
| Code                          | Meaning                  | Usage                     |
| ----------------------------- | ------------------------ | ------------------------- |
| **200 OK**                    | Request successful       | Used on successful login  |
| **201 Created**               | Resource created         | Used on successful signup |
| **400 Bad Request**           | Invalid data format      | Input validation failed   |
| **401 Unauthorized**          | Token missing or invalid | JWT token check failed    |
| **403 Forbidden**             | Wrong credentials        | Invalid email/password    |
| **409 Conflict**              | Duplicate resource       | Email already exists      |
| **500 Internal Server Error** | Server crash or DB issue | Catch-all fallback        |

