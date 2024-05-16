"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface IQueryState {
  "full-name": string;
  email: string;
  phone: string;
  "cover-letter": string;
  cv: File | null;
}

export default function JobsContact() {
  const [query, setQuery] = useState<IQueryState>({
    "full-name": "",
    email: "",
    phone: "",
    "cover-letter": "",
    cv: null,
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleParam =
    () => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.target.name;
      let value: string | File | null = e.target.value;

      if (e.target instanceof HTMLInputElement && e.target.type === "file") {
        value = e.target.files ? e.target.files[0] : null;
        setFileName(e.target.files ? e.target.files[0]?.name : null);
      }

      if (value !== null) {
        setQuery((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    };

const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  const formData = new FormData();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== null) {
      formData.append(key, value);
    }
  });
  try {
    await fetch("https://getform.io/f/05b14e06-09bb-4160-a1e9-129864f18beb", {
      method: "POST",
      body: formData,
    });
    setFormSubmitted(true);
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Error submitting form. Please try again later.", {
      position: "bottom-right",
    });
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  if (formSubmitted) {
    setQuery({
      "full-name": "",
      email: "",
      phone: "",
      "cover-letter": "",
      cv: null,
    });
    setFileName(null);
    toast.success("Form submitted successfully!", {
      position: "bottom-right",
    });
    setFormSubmitted(false);
  }
}, [formSubmitted, setFormSubmitted]);


  return (
    <div id="jobs-form" className="relative bg-white">
      <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div className="mx-auto max-w-lg">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Apply for a Career at SFC
            </h2>
            <p className="mt-3 text-lg leading-6 text-gray-500">
              Ready to take the first step toward a rewarding career in the
              hospitality industry? We&apos;re excited to hear from you.
            </p>
          </div>
        </div>
        <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <form
              onSubmit={formSubmit}
              encType="multipart/form-data"
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
                  placeholder="Full Name"
                  value={query["full-name"]}
                  onChange={handleParam()}
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={query["email"]}
                  onChange={handleParam()}
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  value={query["phone"]}
                  onChange={handleParam()}
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="cover-letter" className="sr-only">
                  Cover Letter
                </label>
                <textarea
                  name="cover-letter"
                  id="cover-letter"
                  rows={4}
                  placeholder="Brief Cover Letter"
                  value={query["cover-letter"]}
                  onChange={handleParam()}
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="cv"
                  className="block text-xl font-bold text-gray-700"
                >
                  Upload CV
                </label>
                <div className="mt-2 flex items-center">
                  <input
                    type="file"
                    name="cv"
                    id="cv"
                    onChange={handleParam()}
                    className="hidden"
                  />
                  <label htmlFor="cv" className="cursor-pointer">
                    <span className="inline-block bg-blue-700 text-white rounded-md py-2 px-4 hover:bg-sfc-blue focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                      Choose File
                    </span>
                  </label>
                  <span id="file-chosen" className="ml-4 text-gray-600">
                    {fileName ? fileName : "No file chosen"}
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center rounded-md border border-transparent bg-sfc-blue py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transform transition hover:scale-105"
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
