const { z } = require("zod");

const appointmentSchema = z.object({
  patientId: z.string().uuid("patientId invalide"),
  appointmentDate: z.string().min(1, "La date est obligatoire"),
  status: z.enum(["pending", "confirmed", "cancelled"]),
  reason: z.string().min(2, "Le motif est obligatoire"),
  notes: z.string().optional()
});

const appointmentStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"])
});

module.exports = {
  appointmentSchema,
  appointmentStatusSchema
};