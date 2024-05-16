import { MegaphoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Banner() {
  return (
    <aside className="bg-blue-700">
      <div className="mx-auto max-w-7xl py-1 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-blue-800 p-2">
              <MegaphoneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 font-bold text-white">
              <span className="md:hidden text-sm">
                <span className="font-extrabold sm:font-bold sm:text-base">FREE</span> DELIVERY<br/>OVER £15
              </span>
              <span className="hidden md:inline text-xl">
                GET FREE DELIVERY WITH ORDERS OVER £15 AT SFC
              </span>
            </p>
          </div>
          <div className="order-3 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <Link
              href="/menu"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-md font-bold text-blue-600 shadow-sm hover:bg-blue-50 transform transition hover:scale-105"
            >
              ORDER NOW
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <Link
              href="tel:01206769181"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-2 py-2 text-md font-bold text-blue-600 shadow-sm hover:bg-blue-50 transform transition hover:scale-105"
            >
              01206 769181
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3 px-1">
            <Link
              href="tel:01206762767"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-2 py-2 text-md font-bold text-blue-600 shadow-sm hover:bg-blue-50 transform transition hover:scale-105"
            >
              01206 762767
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
