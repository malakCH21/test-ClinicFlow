# ClinicFlow — Database Design

## Overview

ClinicFlow uses a PostgreSQL relational database with three main tables:

- `users`
- `patients`
- `appointments`

## Main Entities

### Users
Authenticated application users.

Main fields:
- `id`
- `full_name`
- `email`
- `password`
- `role`
- `created_at`

Roles: `admin`, `staff`.

Passwords are stored as bcrypt hashes.

### Patients
Clinic patients.

Main fields:
- `id`
- `full_name`
- `cin`
- `phone`
- `birthdate`
- `address`
- `created_at`

`cin` is unique.

### Appointments
Appointments linked to patients and created by users.

Main fields:
- `id`
- `patient_id`
- `appointment_date`
- `status`
- `reason`
- `notes`
- `created_by`
- `created_at`

Statuses: `pending`, `confirmed`, `cancelled`.

## Relationships

```text
User 1 -------- N Appointment
Patient 1 ----- N Appointment
```

Foreign keys:

```text
appointments.patient_id → patients.id
appointments.created_by → users.id
```

Patient appointments use `ON DELETE CASCADE`.

User references use `ON DELETE RESTRICT` to preserve traceability.

## Key Constraints

- UUID primary keys
- Unique `users.email`
- Unique `patients.cin`
- Controlled user roles
- Controlled appointment statuses
- Foreign-key integrity

## Indexes

Indexes support common searches and filters on:

```text
patients.full_name
patients.cin
appointments.patient_id
appointments.appointment_date
appointments.status
```

## Business Rule

A patient cannot have two confirmed appointments within a 30-minute time window.

The backend checks for conflicts before creating or confirming an appointment.

## Final Model

```text
USERS
  │
  │ 1
  ▼ N
APPOINTMENTS
  ▲ N
  │
  │ 1
PATIENTS
```
