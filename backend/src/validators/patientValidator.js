const { z } = require("zod");

const patientSchema = z.object({
  fullName: z.string().min(2, "Le nom est obligatoire"),
  cin: z.string().min(3, "Le CIN est obligatoire"),
  phone: z.string().min(6, "Le téléphone est obligatoire"),
  birthDate: z.string().min(1, "La date de naissance est obligatoire"),
  address: z.string().optional()
});

module.exports = patientSchema;