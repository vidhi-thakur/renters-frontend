# 🏠 Renters Tenant Payment Panel

A full-stack web app to accept rent payments and manage them via an admin dashboard.

---

## 🎯 Features

### 💸 Tenant Payment Form
- Public `/pay` route for tenants to submit rent
- Fields: Building Name, Unit Number, Tenant Name, Amount, Payment Method
- Generates a unique transaction ID
- Displays a success screen with the transaction ID

### 🛡 Admin Dashboard
- Protected `/admin` route
- Login with JWT on a public `/login` route (username/password)
- View all payments in a table
- Filter by date, building, etc.
- Mark payments as "Verified"

### QR code for sharing the payment URL

---

## 🔗 Live URLs (if deployed)

| App        | URL                                 |
|------------|--------------------------------------|
| Frontend   | [link](https://renters-frontend.vercel.app/pay)     |
| Backend API | [link](https://renters-backend.onrender.com/api/payments)    |

---

## 🧱 Tech Stack

- React (Vite), Tailwind CSS, React Router
- Node.js, Express, MySQL
- Axios, qrcode.react, JWT
- dotenv for config management

---

## 📁 Backend Setup

1. **Clone the backend repo**

```bash
git clone https://github.com/vidhi-thakur/renters-backend.git
cd renters-backend
npm install
```

2. **Create .env file**
   
```
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=renters_db
JWT_SECRET=your_jwt_secret
```

3. **Start the server**
   
```npm run dev```
API will run on: http://localhost:5000

---

## 📁 Frontend Setup

1. **Clone the frontend repo**

```bash
git clone https://github.com/vidhi-thakur/renters-frontend.git
cd renters-frontend
npm install
```

2. **Create .env file**
   
```
VITE_API_BASE_URL=http://localhost:5000/api
```

3. **Start the app**

```
npm run dev
```
App will run on: http://localhost:5173
