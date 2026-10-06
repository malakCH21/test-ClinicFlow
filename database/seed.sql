-- =========================================================
-- ClinicFlow - Seed Data
-- =========================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- =========================================================
-- USERS
-- Password for all seed users:
-- test123
-- =========================================================

INSERT INTO users (
    full_name,
    email,
    password,
    role
)
VALUES
(
    'ClinicFlow Admin',
    'admin@clinicflow.com',
    crypt('test123', gen_salt('bf')),
    'admin'
),
(
    'hiba Staff',
    'hiba@clinicflow.com',
    crypt('test123', gen_salt('bf')),
    'staff'
),
(
    'Yassine Staff',
    'yassine@clinicflow.com',
    crypt('test123', gen_salt('bf')),
    'staff'
)
ON CONFLICT (email) DO NOTHING;


-- =========================================================
-- PATIENTS
-- =========================================================

INSERT INTO patients (
    full_name,
    cin,
    phone,
    birthdate,
    address
)
VALUES
(
    'Sara Sara',
    'AB123456',
    '0612345678',
    '1998-05-12',
    'Rabat'
),
(
    'Youssef Youssef',
    'CD234567',
    '0623456789',
    '1989-11-23',
    'Casablanca'
),
(
    'Salma Salma',
    'EF345678',
    '0634567890',
    '2001-03-08',
    'Salé'
),
(
    'Omar Omar',
    'GH456789',
    '0645678901',
    '1978-07-15',
    'Kénitra'
),
(
    'Imane Imane',
    'IJ567890',
    '0656789012',
    '1995-09-30',
    'Temara'
)
ON CONFLICT (cin) DO NOTHING;


-- =========================================================
-- APPOINTMENTS
-- =========================================================

INSERT INTO appointments (
    patient_id,
    appointment_date,
    status,
    reason,
    notes,
    created_by
)
VALUES

(
    (SELECT id FROM patients WHERE cin = 'AB123456'),
    CURRENT_DATE + TIME '09:00',
    'confirmed',
    'Consultation générale',
    NULL,
    (SELECT id FROM users WHERE email = 'admin@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'CD234567'),
    CURRENT_DATE + TIME '10:00',
    'pending',
    'Contrôle',
    NULL,
    (SELECT id FROM users WHERE email = 'hiba@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'EF345678'),
    CURRENT_DATE + TIME '11:00',
    'confirmed',
    'Consultation',
    'Contrôle régulier',
    (SELECT id FROM users WHERE email = 'yassine@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'GH456789'),
    CURRENT_DATE + TIME '14:00',
    'cancelled',
    'Analyse',
    'Annulé par le patient',
    (SELECT id FROM users WHERE email = 'hiba@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'IJ567890'),
    CURRENT_DATE + TIME '15:00',
    'pending',
    'Consultation générale',
    NULL,
    (SELECT id FROM users WHERE email = 'admin@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'AB123456'),
    CURRENT_DATE + INTERVAL '1 day' + TIME '10:30',
    'pending',
    'Suivi',
    NULL,
    (SELECT id FROM users WHERE email = 'hiba@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'CD234567'),
    CURRENT_DATE + INTERVAL '1 day' + TIME '12:00',
    'confirmed',
    'Consultation spécialisée',
    'Apporter les anciens résultats',
    (SELECT id FROM users WHERE email = 'yassine@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'EF345678'),
    CURRENT_DATE + INTERVAL '2 days' + TIME '09:30',
    'cancelled',
    'Contrôle',
    NULL,
    (SELECT id FROM users WHERE email = 'admin@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'GH456789'),
    CURRENT_DATE + INTERVAL '2 days' + TIME '14:30',
    'confirmed',
    'Consultation générale',
    NULL,
    (SELECT id FROM users WHERE email = 'test@clinicflow.com')
),

(
    (SELECT id FROM patients WHERE cin = 'IJ567890'),
    CURRENT_DATE + INTERVAL '3 days' + TIME '16:00',
    'pending',
    'Suivi médical',
    'Prévoir contrôle',
    (SELECT id FROM users WHERE email = 'yassine@clinicflow.com')
);