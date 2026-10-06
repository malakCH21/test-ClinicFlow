## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/malakCH21/test-ClinicFlow.git
cd test-ClinicFlow
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=clinicflowDB
DB_PASSWORD=your postgresql password
DB_PORT=5432

JWT_SECRET=your secure jwt secret
```

> Do not commit the backend `.env` file to GitHub.

### Frontend

Create a `.env` file inside the `frontend/` directory:

```env
API_URL=http://localhost:5000/api
```

> Do not commit the frontend `.env` file to GitHub.

---

## 🗄️ Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE clinicflowDB;
```

Then execute the database schema from the project root:

```bash
psql -U postgres -d clinicflowDB -f database/schema.sql
```

Load the test data:

```bash
psql -U postgres -d clinicflowDB -f database/seed.sql
```

---

## ▶️ Commands

### Start the backend

From the project root:

```bash
cd backend
npm run dev
```

The backend API will run at:

```text
http://localhost:5000
```

### Start the frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

The React application will run at:

```text
http://localhost:5173
```

---

## 🔐 Test Accounts

The seed script provides accounts that can be used to test authentication and role-based access.

### Admin

```text
Email: admin@clinicflow.com
Password: test123
Role: admin
```

### Staff

```text
Email: sara@clinicflow.com
Password: test123
Role: staff
```
