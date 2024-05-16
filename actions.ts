"use server";

import { contactFormSchema } from "./lib/zodSchema";
import { prisma } from "./utils/connect";
import { fromErrorToFormState, toFormState } from "./utils/zod";

type FormState = {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  coverLetter?: string;
  cvUrl?: string;
};

export const sendContactForm = async (
  formState: FormState,
  formData: FormData
) => {
  try {
    const data = contactFormSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    await prisma.websiteMessage.create({ data: data });
    return toFormState("SUCCESS", "Message created");
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
