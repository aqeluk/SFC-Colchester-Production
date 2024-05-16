import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { RiRoadMapLine } from "react-icons/ri";
import ContactPageForm from "./ContactPageForm";

export default function ContactUs() {
  return (
    <div className="relative bg-white shadow-xl">
      <h2 className="sr-only">Contact us</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Contact information */}
        <div className="relative overflow-hidden bg-blue-700 py-10 px-6 sm:px-10 xl:p-12">
          <div
            className="pointer-events-none absolute inset-0 sm:hidden"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              width={343}
              height={388}
              viewBox="0 0 343 388"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                fill="url(#linear1)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear1"
                  x1="254.553"
                  y1="107.554"
                  x2="961.66"
                  y2="814.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              width={359}
              height={339}
              viewBox="0 0 359 339"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                fill="url(#linear2)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear2"
                  x1="192.553"
                  y1="28.553"
                  x2="899.66"
                  y2="735.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              width={160}
              height={678}
              viewBox="0 0 160 678"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                fill="url(#linear3)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear3"
                  x1="192.553"
                  y1="325.553"
                  x2="899.66"
                  y2="1032.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">
            Contact information
          </h3>
          <p className="mt-6 max-w-3xl text-base text-indigo-50">
            We&apos;re here to assist you. Feel free to reach out for orders,
            queries, or feedback.
          </p>
          <dl className="mt-8 space-y-6">
            <dt>
              <span className="sr-only">Phone number</span>
            </dt>
            <dd className="flex text-base text-indigo-50">
              <PhoneIcon
                className="h-6 w-6 flex-shrink-0 text-indigo-200"
                aria-hidden="true"
              />
              <span className="ml-3">01206 769 181 / 01206 762 767</span>
            </dd>
            <dt>
              <span className="sr-only">Email</span>
            </dt>
            <dd className="flex text-base text-indigo-50">
              <EnvelopeIcon
                className="h-6 w-6 flex-shrink-0 text-indigo-200"
                aria-hidden="true"
              />
              <span className="ml-3">info@sfc-colchester.co.uk</span>
            </dd>
            <dd className="flex text-base text-indigo-50">
              <RiRoadMapLine
                className="h-6 w-6 flex-shrink-0 text-indigo-200"
                aria-hidden="true"
              />
              <span className="ml-3">
                37a St Botolphs St, Colchester, CO2 7EA
              </span>
            </dd>
          </dl>
        </div>

        {/* Contact form */}
        <div className="py-4 px-6 sm:px-10 lg:col-span-2 xl:p-12 border-sfc-blue border-large rounded-sm">
          <h2 className="text-xl font-medium text-gray-900">
            Send us a message
          </h2>
          <ContactPageForm />
        </div>
      </div>
    </div>
  );
}
