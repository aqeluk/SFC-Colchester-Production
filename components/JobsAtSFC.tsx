import Image from "next/image";
import Link from "next/link";

export default function JobsAtSFC() {
  return (
    <main className="overflow-hidden bg-white px-4 sm:px-6 lg:px-8 border-t-large border-sfc-blue">
      <div className="mx-auto max-w-7xl py-8">
        <div className="relative z-10 mb-8 md:mb-2 md:px-6">
          <div className="max-w-prose text-base lg:max-w-none">
            <h2 className="text-xl md:text-2xl font-semibold text-sfc-blue">
              Careers at SFC
            </h2>
            <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-5xl">
              Join Our Family of Culinary Excellence
            </p>
          </div>
        </div>
        <div className="relative">
          <svg
            className="absolute top-0 right-0 -mt-20 -mr-20 hidden md:block"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 -mb-20 -ml-20 hidden md:block"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="7a00fe67-0343-4a3c-8e81-c145097a3ce0"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)"
            />
          </svg>
          <div className="relative md:bg-white md:p-6">
            <div className="lg:grid lg:grid-cols-2 lg:gap-6">
              <div className="prose prose-xl md:prose-2xl text-gray-500 lg:max-w-none">
                <p>
                  Working at Southern Fried Chicken Colchester isn&apos;t just a
                  job; it&apos;s an opportunity to grow professionally and
                  personally in an inclusive and dynamic environment.
                </p>
                <h3>Why Choose SFC?</h3>
                <ul role="list" className="marker:text-black">
                  <li>Competitive Salaries and Benefits</li>
                  <li>Career Advancement Opportunities</li>
                  <li>Flexible Work Schedules</li>
                  <li>A Positive and Inclusive Workplace</li>
                </ul>
              </div>
              <div className="prose prose-xl md:prose-2xl mt-6 text-gray-500 lg:mt-0">
                <p>
                  If you&apos;re passionate about food, customer service, and
                  creating memorable experiences, we&apos;d love to hear from
                  you.
                </p>
                <p>
                  Become a part of a team that values integrity, innovation, and
                  community. Take the first step towards an exciting career with
                  SFC today!
                </p>
                <Image
                  className="rounded-lg object-cover object-center shadow-lg"
                  src="/WorkingInsideKitchenTickets.jpeg"
                  alt="Southern Fried Chicken Colchester Kitchen Handling Tickets"
                  width={1170}
                  height={780}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
            <div className="mt-8 inline-flex rounded-md shadow">
              <Link
                href="#jobs-form"
                className="flex items-center md:text-2xl justify-center rounded-md border border-transparent bg-sfc-blue px-5 py-3 text-base font-medium text-white hover:bg-blue-900"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
