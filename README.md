# 📝 Customer Registration App (Full Stack)

A responsive customer registration form built with **React.js (frontend)** and **Node.js + MySQL (backend)**. It is designed for sales executives to collect real-time customer data during in-person visits — complete with location tracking and smart validations.

---

## ✨ Key Features

* ✅ Fully validated customer form with real-time location capture
* 📍 Fetches and stores GPS coordinates (latitude, longitude)
* 🔐 Password strength meter
* 🧠 Auto-fill for returning customers by phone number
* 🗺️ Google Maps preview of captured location
* 🧪 Smart form fields with character counts, error messages, and validation feedback
* 📱 Mobile-friendly and browser-compatible
* 🛡️ Captures device/browser info during submission

---

## 👨‍💼 Use Case

This form is designed for **sales executives** to be used during in-person customer interactions. It runs in a browser (desktop, tablet, or mobile) and captures the customer’s real-time location for service coverage tracking and record-keeping.

---

## 📋 Required Fields

* Full Name (required)
* Email Address (required, valid format)
* Phone Number (required, 10 digits)
* Gender (Male / Female / Other)
* Date of Birth (required)
* Address (required, multiline)
* Password and Confirm Password (required, minimum 6 characters)
* Latitude and Longitude (auto-filled using browser geolocation)

---

## 🔐 Validation Rules

* All required fields are validated
* Password & confirm password must match
* Latitude/Longitude are read-only
* Geolocation permission handled gracefully
* Success message shown after successful submission

---

## 🧠 Tech Stack

* **Frontend**: React, Vite, Axios, CSS
* **Backend**: Node.js, Express
* **Database**: MySQL (Hostinger)
* **Deployment**: Railway (backend), Hostinger (frontend)
* **Extras**: Google Maps API, Device detection via `navigator.userAgent`

---

## 📁 Project Structure (Frontend)

```
frontend/
├── src/
│   ├── components/
│   │   ├── FormInput.jsx
│   │   ├── FormSelect.jsx
│   │   ├── FormCheckbox.jsx
│   │   ├── Header.jsx
│   │   ├── LocationButton.jsx
│   │   ├── MapPreview.jsx
│   │   ├── MessageBox.jsx
│   ├── pages/
│   │   ├── CustomerForm.jsx
│   │   ├── Home.jsx
│   ├── styles/
│   │   ├── main.css
│   │   ├── Header.css
│   │   ├── FormInput.css
│   │   ├── FormSelect.css
│   │   ├── Footer.css
│   │   ├── Home.css
│   │   ├── 404.css
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
```

---

## 🚀 Frontend Setup & Deployment (React + Vite)

### 📦 Local Setup

1. Clone the repository:

```bash
git clone https://github.com/nikhilgupta-9/optronix-project/tree/backend
cd frontend
```

2. Install dependencies:

npm install

3. Create `.env` file for backend API:

```env
VITE_API_BASE_URL=https://optronix-project.com
```

4. Start development server:

```bash
npm run dev
```

---

### 🌐 Deployment on Hostinger

1. Run production build:

```bash
npm run build
```

2. Upload contents of `/dist` folder to your Hostinger `public_html` directory
3. If hosted under subfolder (e.g. `/optronix-projectd`), update `vite.config.js`:

```js
base: '/optronix-projectd/',
```

---

## ⚙️ Backend Setup (Node.js + MySQL)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=5000
DB_HOST=your-hostinger-mysql-host
DB_USER=your-db-username
DB_PASS=your-db-password
DB_NAME=customerdb
```

4. Start server:

```bash
node server.js
```

---

### 🚀 Backend Deployment (Railway)

* Push backend to GitHub
* Go to [Railway](https://railway.app/) → New Project → Deploy from GitHub
* Add `.env` variables in Railway Dashboard
* It will give a public API URL like:

  ```
  https://optronix-project.com
  ```

---

## 🔁 How Frontend Connects to Backend

* Axios in frontend uses `VITE_API_BASE_URL` to hit backend API
* On form submit, sends customer data along with:

  * GPS coordinates
  * Browser/device info
  * All other form fields

---

## 📸 Screenshots

*(I add screenshot folder in my repo you can see there)*

* Form View
* Google Map Preview
* Password Strength Meter
* Success Message


```



---

## ✍️ Author

Made with ❤️ by [Nikhil Gupta](https://github.com/nikhilgupta-9)

-----




# 📦 Backend - Customer Registration API

This is the **Node.js + Express** backend for the Customer Registration App. It handles form submissions, validation, MySQL database operations, and captures geolocation + device info.

---

## 🚀 Features

* REST API to register new customers
* Stores all form data in MySQL database
* Captures browser/device info
* Auto-fills form if phone number already exists
* Error handling and validation at API level
* Deployed using Railway
* Supports CORS for frontend integration

---

## 🧠 Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MySQL (Remote - Hostinger)
* **Deployment**: Railway
* **Other**: dotenv, mysql2, cors

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js               # MySQL DB connection using dotenv
├── controllers/
│   └── customerController.js # Business logic
├── models/
│   └── customerModel.js    # DB queries
├── routes/
│   └── customerRoutes.js   # API routes
├── .env                    # Environment variables
├── server.js               # Entry point
└── package.json
```

---

## 🔧 Setup Instructions (Local Development)

### 1️⃣ Clone the Repository & Navigate

```bash
git clone https://github.com/nikhilgupta-9/optronix-project
cd backend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

Installs:

* `express`
* `mysql2`
* `cors`
* `dotenv`

---

### 3️⃣ Configure `.env`

Create a `.env` file in the `backend/` folder with the following:

```env
PORT=5000

DB_HOST=your-hostinger-db-host
DB_USER=your-db-username
DB_PASS=your-db-password
DB_NAME=customerdb
```

---

### 4️⃣ Start the Server

```bash
nodemon server.js
```

> If `nodemon` not installed, install it globally:

```bash
npm install -g nodemon
```

Now visit: `http://localhost:5000/api/customers/register`

---

## 📡 API Endpoint

### `POST /api/customers/register`

Registers a new customer.

#### ✅ Request Body:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "gender": "Male",
  "dob": "1998-05-21",
  "address": "123 Street, Delhi",
  "latitude": "28.6139",
  "longitude": "77.2090",
  "password": "secret123",
  "confirmPassword": "secret123",
  "deviceInfo": "Chrome on Windows 10"
}
```

---

## 🌐 Deployment Instructions (Railway)

1. Go to [https://railway.app](https://railway.app)
2. Create a new project → Deploy from GitHub
3. Connect your backend GitHub repo
4. Add environment variables from `.env`
5. Click **Deploy**
6. You’ll get a public API URL like:

   ```
   https://optronix-project-production.up.railway.app
   ```

---

## ✅ MySQL Setup (Hostinger)

1. Login to Hostinger → Manage MySQL
2. Create database `customerdb`
3. Create a table `customers` with fields:

```sql
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(10),
  gender VARCHAR(10),
  dob DATE,
  address TEXT,
  password VARCHAR(255),
  latitude VARCHAR(50),
  longitude VARCHAR(50),
  deviceInfo TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing

Use Postman or frontend to hit:

```
POST https://optronix-project-production.up.railway.app/api/customers/register
```

---

## 📂 Git Commands to Push Backend

```bash
git init
git branch -M backend
git remote add origin https://github.com/your-username/optronix-backend.git
git add .
git commit -m "Initial backend setup"
git push -u origin backend
```

---

## 🙋 Author

Developed with ❤️ by [Nikhil Gupta](https://github.com/nikhilgupta-9)

---




# Customer Registration App
