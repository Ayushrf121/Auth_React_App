# ⚛️ FRONTEND SETUP (React + Vite + React Router + Toastify)
# 🗂 1. Directory Structure
frontend/
│
├── pages/
│   ├── Signup.jsx
│   ├── Login.jsx
│   └── Home.jsx
│
├── util.jsx
├── App.jsx
├── index.css
└── main.jsx

# ⚙️ 2. NPM Packages to Install
```bash
npm create vite@latest .
npm install react-router-dom react-toastify
```
| Package              | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| **react-router-dom** | Enables navigation between Login, Signup, and Home pages |
| **react-toastify**   | Displays success and error popups (toasts)               |

# 🧱 3. main.jsx
* Wrap your app in BrowserRouter for routing support

# 🧩 4. App.jsx
* Define all frontend routes:

# 🔔 5. util.jsx
* Utility for toast notifications

# 🚀 6. Running the Frontend
```bash
cd frontend
npm run dev
```