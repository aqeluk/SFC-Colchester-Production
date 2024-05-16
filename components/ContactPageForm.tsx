"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { sendContactForm } from "@/actions";
import { EMPTY_FORM_STATE } from "@/utils/zod";
import { useToastMessage } from "@/hooks/toast";
import { useFormReset } from "@/hooks/resetForm";

const ContactPageForm = () => {
  const [formState, action] = useFormState(sendContactForm, EMPTY_FORM_STATE);

  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);

  return (
    <form
      action={action}
      ref={formRef}
      className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
    >
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-900"
        >
          First name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="firstName"
            id="firstName"
            autoComplete="given-name"
            required
            placeholder="First Name"
            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-xs text-red-400">
            {formState.fieldErrors["firstName"]?.[0]}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-900"
        >
          Last name
        </label>
        <span id="lastName-optional" className="text-sm text-gray-500">
          Optional
        </span>
        <div className="mt-1">
          <input
            type="text"
            name="lastName"
            id="lastName"
            autoComplete="family-name"
            placeholder="Last Name"
            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-xs text-red-400">
            {formState.fieldErrors["lastName"]?.[0]}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email Address"
            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-xs text-red-400">
            {formState.fieldErrors["email"]?.[0]}
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-900"
          >
            Phone
          </label>
        </div>
        <div className="mt-1">
          <input
            type="text"
            name="phone"
            id="phone"
            required
            autoComplete="tel"
            placeholder="Phone Number"
            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            aria-describedby="phone-optional"
          />
          <span className="text-xs text-red-400">
            {formState.fieldErrors["phone"]?.[0]}
          </span>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-900"
        >
          Subject
        </label>
        <span id="subject-optional" className="text-sm text-gray-500">
          Optional
        </span>
        <div className="mt-1">
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-xs text-red-400">
            {formState.fieldErrors["subject"]?.[0]}
          </span>
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex justify-between">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-900"
          >
            Message
          </label>
          <span id="message-max" className="text-sm text-gray-500">
            Max. 500 characters
          </span>
        </div>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Message"
            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            aria-describedby="message-max"
          />
          <span className="text-xs text-red-400">
            {formState.fieldErrors["message"]?.[0]}
          </span>
        </div>
      </div>
      <div className="sm:col-span-2 sm:flex sm:justify-end"></div>
      <SubmitButton
        label="Submit"
        loading="Submitting..."
        cn="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sfc-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto transform transition hover:scale-105"
      />
      <span className="font-bold">{formState.message}</span>
      {noScriptFallback}
    </form>
  );
};

export default ContactPageForm;
