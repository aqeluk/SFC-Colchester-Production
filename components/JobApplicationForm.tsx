"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { sendJobApplication } from "@/actions";
import { EMPTY_FORM_STATE } from "@/utils/zod";
import { useToastMessage } from "@/hooks/toast";
import { useFormReset } from "@/hooks/resetForm";
import { useState } from "react";

const JobApplicationForm = () => {
  const [formState, action] = useFormState(sendJobApplication, EMPTY_FORM_STATE);
  const [file, setFile] = useState<File | null>(null);

  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);

  return (
    <form
      action={action}
      ref={formRef}
      className="grid grid-cols-1 gap-y-6"
    >
      <div>
        <label htmlFor="full-name" className="sr-only">
          Full Name
        </label>
        <input
          type="text"
          name="full-name"
          id="full-name"
          autoComplete="name"
          required
          placeholder="Full Name"
          className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span className="text-xs text-red-400">
          {formState.fieldErrors["fullName"]?.[0]}
        </span>
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          autoComplete="email"
          placeholder="Email Address"
          className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span className="text-xs text-red-400">
          {formState.fieldErrors["email"]?.[0]}
        </span>
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          autoComplete="tel"
          placeholder="Phone Number"
          className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span className="text-xs text-red-400">
          {formState.fieldErrors["phone"]?.[0]}
        </span>
      </div>
      <div>
        <label htmlFor="cover-letter" className="sr-only">
          Cover Letter
        </label>
        <span id="subject-optional" className="text-sm text-gray-500">
          Optional
        </span>
        <textarea
          name="cover-letter"
          id="cover-letter"
          rows={4}
          placeholder="Brief Cover Letter"
          className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span className="text-xs text-red-400">
          {formState.fieldErrors["coverLetter"]?.[0]}
        </span>
      </div>
      <div className="relative">
        <label htmlFor="cv" className="block text-xl font-bold text-gray-700">
          Upload CV
        </label>
        <div className="mt-2 flex items-center">
          <input
            type="file"
            name="cv"
            id="cv"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
          <label htmlFor="cv" className="cursor-pointer">
            <span className="inline-block bg-blue-700 text-white rounded-md py-2 px-4 hover:bg-sfc-blue focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              Choose File
            </span>
          </label>
          <span className="text-xs text-red-400">
            {formState.fieldErrors["cv"]?.[0]}
          </span>
          <span id="file-chosen" className="ml-4 text-gray-600">
            {file ? file.name : "No file chosen"}
          </span>
        </div>
      </div>
      <div>
        <SubmitButton
          label="Submit"
          loading="Submitting..."
          cn="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sfc-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto transform transition hover:scale-105"
        />
        <span className="font-bold">{formState.message}</span>
        {noScriptFallback}
      </div>
    </form>
  );
};

export default JobApplicationForm;
