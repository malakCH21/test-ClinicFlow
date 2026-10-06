-- =========================================================
-- ClinicFlow - Seed Data
-- =========================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- =========================================================
-- USERS
-- Password for all seed users:
-- test123
-- =========================================================

INSERT INTO users (id,full_name,email,password,role)
VALUES

(
    '1',
    'ClinicFlow Admin',
    'admin@clinicflow.com',
    crypt('test123', gen_salt('bf')),
    'admin'
),

(
    '2',
    'malak Staff',
    'malak@clinicflow.com',
    crypt('test123', gen_salt('bf')),
    'staff'
),

(
    '3',
    'Yassine Staff',
    'yassine@clinicflow.com',
    crypt('test123', gen_salt('bf')),
    'staff'
)

ON CONFLICT (email) DO NOTHING;


-- =========================================================
-- PATIENTS
-- =========================================================

INSERT INTO patients (id,full_name,cin,phone,birthdate,address)
VALUES

(
    'a1',
    'Sara sara',
    'AB123456',
    '0612345678',
    '1998-05-12',
    'Rabat'
),

(
    'a2',
    'Youssef youssef',
    'CD234567',
    '0623456789',
    '1989-11-23',
    'Casablanca'
),

(
    'a3',
    'Salma salma',
    'EF345678',
    '0634567890',
    '2001-03-08',
    'Salé'
),

(
    'a4',
    'Omar omar',
    'GH456789',
    '0645678901',
    '1978-07-15',
    'Kénitra'
),

(
    'a5',
    'Imane imane',
    'IJ567890',
    '0656789012',
    '1995-09-30',
    'Temara'
)

ON CONFLICT (cin) DO NOTHING;


-- =========================================================
-- APPOINTMENTS
-- =========================================================

INSERT INTO appointments (patient_id,appointment_date,status,reason,notes,created_by)
VALUES

(
    'a1',
    CURRENT_DATE + TIME '09:00',
    'confirmed',
    'Consultation générale',
    '1'
),

(
    'a2',
    CURRENT_DATE + TIME '10:00',
    'pending',
    'Contrôle',
    NULL,
    '2'
),

(
    'a3',
    CURRENT_DATE + TIME '11:00',
    'confirmed',
    'Consultation',
    'Contrôle régulier',
    '33333333-3333-4333-8333-333333333333'
),

(
    'a4',
    CURRENT_DATE + TIME '14:00',
    'cancelled',
    'Analyse',
    'Annulé par le patient',
    '2'
),

(
    'a5',
    CURRENT_DATE + TIME '15:00',
    'pending',
    'Consultation générale',
    NULL,
    '1'
),

(
    'a1',
    CURRENT_DATE + INTERVAL '1 day' + TIME '10:30',
    'pending',
    'Suivi',
    NULL,
    '2'
),

(
    'a2',
    CURRENT_DATE + INTERVAL '1 day' + TIME '12:00',
    'confirmed',
    'Consultation spécialisée',
    'Apporter les anciens résultats',
    '3'
),

(
    'a3',
    CURRENT_DATE + INTERVAL '2 days' + TIME '09:30',
    'cancelled',
    'Contrôle',
    NULL,
    '1'
),

(
    'a4',
    CURRENT_DATE + INTERVAL '2 days' + TIME '14:30',
    'confirmed',
    'Consultation générale',
    NULL,
    '2'
),

(
    'a5',
    CURRENT_DATE + INTERVAL '3 days' + TIME '16:00',
    'pending',
    'Suivi médical',
    'Prévoir contrôle',
    '3'
);