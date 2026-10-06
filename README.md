## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/malakCH21/test-ClinicFlow.git
cd test-ClinicFlow
```

### 2. Start the application with Docker

Make sure Docker Desktop is installed and running.

From the project root:

```bash
docker compose up --build
```

Docker Compose will automatically start:

- PostgreSQL database
- Backend API
- Frontend React application

The database schema and seed data are initialized automatically.

---

## ⚙️ Environment Variables

The backend environment variables are configured for Docker.

Example:

```env
PORT=5000

DB_USER=postgres
DB_HOST=postgres
DB_NAME=clinicflowDB
DB_PASSWORD=postgres
DB_PORT=5432

JWT_SECRET=your secure jwt secret
```


---

## 🗄️ Database Setup

No manual PostgreSQL configuration is required.

Docker automatically:

- creates the PostgreSQL container;
- creates the `clinicflowDB` database;
- executes the database schema;
- loads the seed data.

---

## ▶️ Commands

### Start the application

```bash
docker compose up --build
```

Backend API:

```text
http://localhost:5000
```

Frontend:

```text
http://localhost:5173
```

### Stop the application

```bash
docker compose down
```

To also remove the PostgreSQL volume:

```bash
docker compose down -v
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
Email: hiba@clinicflow.com
Password: test123
Role: staff
```

### Staff

```text
Email: yassine@clinicflow.com
Password: test123
Role: staff
```
