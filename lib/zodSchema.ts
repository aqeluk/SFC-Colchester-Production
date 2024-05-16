import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name too long"),
  lastName: z.string().max(50, "Last name too long").optional(),
  email: z.string().email("Invalid email format").max(50, "Email too long"),
  phone: z
    .string()
    .regex(
      /^\d+$/,
      "Phone number must contain only digits. Replace '+44' or '00' with '0' if necessary."
    )
    .min(10, "Phone number must be at least 10 digits") // Example with UK numbers
    .max(11, "Phone number must be a maximum of 11 digits"), // Example with UK numbers
  subject: z.string().max(80, "Subject cannot exceed 80 characters").optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message cannot exceed 500 characters"),
});