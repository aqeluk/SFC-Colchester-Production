import Image from "next/image";

export default function HomeTestimonials() {
  return (
    <section className="mx-auto max-w-7xl md:grid md:grid-cols-2 py-2">
        <div className="py-8 md:flex md:flex-col md:py-16 md:pr-0 md:pl-10 lg:pl-16 lg:pr-16 m-1 border-large border-sfc-blue bg-white rounded-xl">
          <blockquote className="md:flex md:flex-grow md:flex-col p-4">
            <div className="relative text-lg font-medium text-sfc-blue md:flex-grow">
              <p className="relative md:text-2xl">
                &ldquo;The crispiness, the flavor, and the perfect amount of
                spice! This is hands down the best fried chicken in town.&rdquo;
              </p>
            </div>
            <footer className="mt-8">
              <div className="flex items-start">
                <div className="inline-flex flex-shrink-0 rounded-full border-2 border-blue-600">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src="/reviewer2.jpg"
                    alt="Ash Carmichael, Daily Foodie Customer"
                    width={256}
                    height={256}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-base md:text-xl font-medium text-gray-900">
                    Ash Carmichael
                  </div>
                  <div className="text-base md:text-lg font-medium text-sfc-blue">
                    Daily Foodie
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="py-8 md:flex md:flex-col md:py-16 md:pl-0 md:pr-10 lg:pr-16 m-1 border-large border-sfc-blue bg-white rounded-xl">
          <blockquote className="md:flex md:flex-grow md:flex-col p-4 md:mx-10">
            <div className="relative text-lg font-medium text-sfc-blue md:flex-grow">
              <p className="relative md:text-2xl">
                &ldquo;Every time I order from Southern Fried Chicken, it feels
                like a treat. The taste is unmatched and brings back memories of
                home!&rdquo;
              </p>
            </div>
            <footer className="mt-8">
              <div className="flex items-start">
                <div className="inline-flex flex-shrink-0 rounded-full border-2 border-blue-600">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src="/reviewer1.jpg"
                    alt="Sophia Martinez, Long-time Customer"
                    width={256}
                    height={256}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-base md:text-xl font-medium text-gray-900">
                    Sophia Martinez
                  </div>
                  <div className="text-base md:text-lg font-medium text-sfc-blue">
                    Long-time Customer
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
    </section>
  );
}
