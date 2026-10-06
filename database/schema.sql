-- =========================================================
-- ClinicFlow - Database Schema
-- =========================================================

-- UUID support
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Better performance for ILIKE searches
CREATE EXTENSION IF NOT EXISTS pg_trgm;


-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (role IN ('admin', 'staff')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- PATIENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(150) NOT NULL,

    cin VARCHAR(50) NOT NULL UNIQUE,

    phone VARCHAR(30) NOT NULL,

    birthdate DATE NOT NULL,

    address TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- APPOINTMENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    patient_id UUID NOT NULL,

    appointment_date TIMESTAMPTZ NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'pending'CHECK (status IN ('pending','confirmed','cancelled')),

    reason VARCHAR(255) NOT NULL,

    notes TEXT,

    created_by UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_appointments_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,

    CONSTRAINT fk_appointments_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
);


-- =========================================================
-- INDEXES
-- =========================================================

-- Search by patient name
CREATE INDEX IF NOT EXISTS idx_patients_full_name_trgm
ON patients
USING gin (full_name gin_trgm_ops);

-- CIN search / lookup
CREATE INDEX IF NOT EXISTS idx_patients_cin
ON patients(cin);

-- Appointment filters
CREATE INDEX IF NOT EXISTS idx_appointments_date
ON appointments(appointment_date);

CREATE INDEX IF NOT EXISTS idx_appointments_status
ON appointments(status);

CREATE INDEX IF NOT EXISTS idx_appointments_patient
ON appointments(patient_id);

-- Useful for the 30-minute conflict business rule
CREATE INDEX IF NOT EXISTS idx_appointments_patient_status_date
ON appointments(patient_id,status,appointment_date);