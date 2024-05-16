import Link from 'next/link';

export default function OpeningHoursCTA() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-6 sm:flex sm:items-center sm:justify-between sm:py-16 sm:px-8">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Craving for great food?</span>
            <span className="block text-sfc-blue">We&apos;re Open!</span>
          </h2>
          <div className="mt-6 text-xl font-bold text-gray-700 md:text-2xl">
            <ul className="md:list-disc md:list-inside">
              <li className="text-blue-800">Weekdays &amp; Sundays: 4pm - 3am</li>
              <li className="text-blue-800">Fridays &amp; Saturdays: 4pm - Late</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex sm:mt-0 sm:flex-shrink-0 sm:w-1/2 sm:justify-end">
          <div className="inline-flex rounded-md shadow">
            <Link href="/find-us" className="inline-flex items-center justify-center rounded-md border border-transparent bg-sfc-blue px-5 py-3 text-base font-medium text-white hover:bg-blue-700 transform transition hover:scale-105">
                Find Us
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link href="/menu" className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-900 px-5 py-3 text-base font-medium text-white hover:bg-blue-700 transform transition hover:scale-105">
                Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
