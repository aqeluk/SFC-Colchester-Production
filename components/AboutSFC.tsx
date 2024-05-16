import Image from "next/image";
import Link from "next/link";
import { GiFarmTractor } from "react-icons/gi";
import { SlSpeedometer } from "react-icons/sl";
import { IoIosPeople } from "react-icons/io";

const AboutSFC = () => {
  return (
    <main className="relative border-t-large border-sfc-blue md:py-8">
      <div className="lg:absolute lg:inset-0">
        <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 md:py-8 md:px-8">
          <Image
            src="/SFCChicken.jpg"
            alt="Southern Fried Chicken Colchester Kitchen"
            height={1600}
            width={900}
            className="h-56 w-full object-cover lg:absolute lg:h-full md:rounded-xl"
            priority
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className="relative px-4 pt-8 md:pt-0 pb-16 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="lg:col-start-2 lg:pl-8">
          <div className="mx-auto max-w-prose lg:ml-auto lg:mr-0 lg:max-w-lg">
            <h2 className="font-semibold text-lg md:text-xl leading-6 text-sfc-blue">
              About Southern Fried Chicken Colchester
            </h2>
            <h3 className="mt-2 text-4xl font-bold leading-8 tracking-tight text-gray-900 md:text-5xl">
              Excellence in Every Bite
            </h3>
            <p className="mt-8 text-lg md:text-2xl text-gray-500">
              Since its acquisition in 2020, Southern Fried Chicken Colchester
              has risen to be a culinary icon, offering exceptional dining
              experiences to the Colchester community and its surrounding areas.
            </p>
            <div className="prose prose-indigo md:text-xl mt-5 text-gray-500">
              <p>
                Renowned for our delicious fried chicken and heartfelt service,
                we&apos;ve introduced our new online ordering platform to
                elevate your convenience. Now, you can relish our
                freshly-prepared meals from the comfort of your sofa and even
                complete your payment online and enjoy a dining experience that
                feels like home.
              </p>
              <h3 className="md:text-3xl">Why Choose Us?</h3>
              <ul role="list" className="md:text-xl">
                <li className="flex items-center gap-4">
                  <GiFarmTractor className="w-8 h-8" />
                  Top-tier ingredients sourced from premier suppliers
                </li>
                <li className="flex items-center gap-4">
                  <SlSpeedometer className="w-8 h-8" />
                  Fast and friendly service
                </li>
                <li className="flex items-center gap-4">
                  <IoIosPeople className="w-8 h-8" />A community hub, not just a
                  restaurant
                </li>
              </ul>
              <p className="md:text-xl">
                We pride ourselves on not just being a restaurant but a
                community gathering spot. Whether you&apos;re celebrating a
                milestone or just craving some comfort food, we&apos;re here to
                serve you.
              </p>
              <h3 className="md:text-3xl">Our Commitment</h3>
              <p className="md:text-xl">
                We are committed to maintaining the high standards that have
                made us a popular choice among residents and visitors alike.
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
};

export default AboutSFC;
