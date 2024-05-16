import { CameraIcon } from '@heroicons/react/20/solid'
import Image from "next/image"
import Link from 'next/link';

export default function Halal() {
  return (
    <main className="overflow-hidden border-t-large border-sfc-blue">
      <div className="relative mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-sfc-blue">Our Commitment</h2>
            <h3 className="mt-2 text-3xl font-bold leading tracking-tight text-gray-900 sm:text-5xl">Halal Excellence in Every Bite</h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:col-start-2 lg:row-start-1 lg:order-last">
          <svg
              className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
            </svg>
            <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                  <Image
                    className="rounded-lg object-cover object-center shadow-lg"
                    src="/HalalStall.jpeg"
                    alt="Halal Food Stall"
                    width={800}
                    height={1376} />
                </div>
                <figcaption className="mt-3 flex text-sm text-gray-500">
                  <CameraIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  <span className="ml-2">Photograph by Tim Hüfner</span>
                </figcaption>
              </figure>
            </div>          </div>
          <div className="mt-8 lg:mt-0 lg:order-first">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <p className="text-lg md:text-2xl text-gray-500">
                At Southern Fried Chicken Colchester, we are deeply committed to serving Halal food that meets the highest standards of quality. Our devotion to Halal excellence is a testament to our respect for the diverse culinary needs of our multicultural community.
              </p>
            </div>
            <div className="prose md:text-xl prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
              <p>
                We continuously strive to source the finest and freshest products from reputable suppliers. This meticulous approach ensures that you enjoy not just Halal food, but food that is of the highest quality.
              </p>
              <h3 className='md:text-3xl'>Why Choose Our Halal Options?</h3>
              <ul role="list" className='marker:text-black md:text-xl'>
                <li>Strict adherence to Halal guidelines.</li>
                <li>Use of premium, locally sourced Halal ingredients.</li>
                <li>An extensive menu offering diverse Halal choices.</li>
              </ul>
              <p>
                Our mission is to provide a dining experience that caters to a variety of dietary needs while never compromising on taste or quality.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/menu"
                className="inline-flex md:text-2xl items-center px-6 py-3 text-white bg-sfc-blue rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-800 focus:ring focus:ring-blue-300 transition transform hover:scale-105"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
