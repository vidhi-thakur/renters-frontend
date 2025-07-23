# 🏠 Renters Tenant Payment Panel

A full-stack web app to accept rent payments and manage them via an admin dashboard.


## 🔗 Live URLs

| App        | URL                                 |
|------------|--------------------------------------|
| Frontend   | [link](https://renters-frontend.vercel.app/pay)     |
| Backend API | [link](https://renters-backend.onrender.com/api/payments)    |



## 🧱 Tech Stack

- React (Vite), Tailwind CSS, React Router
- Node.js, Express, MySQL
- Axios, qrcode.react, JWT
- dotenv for config management



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



## 📡 API Endpoints

1. `POST /api/payments`
Allows tenants to submit a new rent payment, which is then stored in the payments table in MySQL DB.

Request Body:
```json
{
  "building_name": "Tower A",
  "unit_number": "302",
  "tenant_name": "John Doe",
  "amount": 12000,
  "payment_method": "UPI"
}
```

2. `GET /api/payments`
Returns a list of all rent payments. This endpoint is used by the admin panel.


3. `PATCH /api/payments/`
Allows the admin to toggle the "verified" status of a payment.
Requires: Authorization: Bearer <JWT_TOKEN>

Request Body:
```json
{
  "id": "23",
  "verified": true,
}
```

4. `POST /api/auth`
Authenticates admin and returns a JWT token.

Request Body:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

## 🎯 Features

### 💸 Tenant Payment Form
1. Public `/pay` route for tenants to submit rent
2. Fields: Building Name, Unit Number, Tenant Name, Amount, Payment Method
3. Generates a unique transaction ID
4. Displays a success screen with the transaction ID

### 🛡 Admin Dashboard
1. Protected `/admin` route
2. Login with JWT on a public `/login` route (username/password)
3. View all payments in a table
4. Filter by date, building, etc.
5. Mark payments as "Verified"

### ✅ Bonus Features Implemented
1. JWT-based authentication
2. Environment-based config with .env
3. QR code for payment form
5. Admin table filters (by date, building, verified)

## 🚧 Assumptions & Notes
1. Frontend and backend are deployed separately
2. All payments are stored in a single payments table
3. The `/pay` route is public; `/admin` is protected via token
4. QR code for scan and pay option is deployed on `/` route, it redirects to `/pay` and prefills the input fields.
