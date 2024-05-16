import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { GiFarmTractor } from "react-icons/gi";
import { ImHappy } from "react-icons/im";
import { MdDeliveryDining } from "react-icons/md";

export default function HomeContent() {
  return (
    <section className="relative flex flex-col lg:flex-row space-y-8 m-2">
      <div className="order-2 lg:order-1 h-56 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2 z-0">
        <Image
          className="h-full w-full object-cover rounded-b-xl md:rounded-b-none md:rounded-l-xl"
          src="/FreshCrispyChicken.jpeg"
          alt="Delicious Southern Fried Chicken"
          height={500}
          width={500}
        />
      </div>
      <div className="order-1 lg:order-2 flex-1 flex items-center justify-center flex-col gap-8 text-blue-700 font-bold z-10">
        <div className="flex flex-col items-center mx-auto max-w-2xl md:mr-0 md:ml-auto md:w-1/2 md:max-w-none">
          <h1 className="mt-6 text-5xl text-center uppercase md:text-6xl xl:text-7xl inline lg:bg-transparent">
            Crispy, Juicy &amp; Freshly Made!
          </h1>
          <p className="mt-6 mx-2 text-xl md:text-3xl text-center inline md:px-12">
            Experience the authentic taste of the South with our mouth-watering
            fried Chicken
          </p>
          <p className="text-2xl text-center md:text-4xl inline md:px-12">
            Always Fresh, Always Crispy!
          </p>
          <button className="mt-4 bg-sfc-blue text-white py-2 px-8 rounded-md transform transition hover:scale-105 hover:bg-blue-600">
            See Our Menu
          </button>
          <div className="mt-8 text-center bg-white w-full md:rounded-br-xl rounded-t-xl md:rounded-t-none">
            <h2 className="text-3xl font-bold p-4 text-sfc-blue lg:bg-transparent">
              Why Customers Love Us:
            </h2>
            <dl className="flex flex-wrap justify-center py-6 md:divide-x-large">
              <div className="flex-col px-8 pt-4 transform transition hover:scale-105">
                <dt className="order-2 text-xl text-center font-medium text-sfc-blue inline lg:bg-transparent">
                  Freshness
                </dt>
                <div className="flex items-center gap-2">
                  <GiFarmTractor className="h-10 w-10 text-sfc-blue" />
                  <dd className="order-1 text-2xl font-bold text-sfc-blue sm:text-3xl sm:tracking-tight lg:bg-transparent">
                    100%
                  </dd>
                </div>
              </div>
              <div className="flex-col px-8 pt-4 transform transition hover:scale-105">
                <dt className="order-2 text-xl text-center font-medium text-sfc-blue inline lg:bg-transparent">
                  On-Time Delivery
                </dt>
                <div className="flex items-center gap-2">
                  <MdDeliveryDining className="h-10 w-10 text-sfc-blue" />
                  <dd className="order-1 text-2xl font-bold text-sfc-blue sm:text-3xl sm:tracking-tight lg:bg-transparent">
                    95%
                  </dd>
                </div>
              </div>
              <div className="flex-col px-8 pt-4 transform transition hover:scale-105">
                <dt className="order-2 text-xl text-center font-medium text-sfc-blue inline lg:bg-transparent">
                  Satisfaction
                </dt>
                <div className="flex items-center gap-2">
                  <ImHappy className="h-10 w-10 text-sfc-blue" />
                  <dd className="order-1 text-2xl font-bold text-sfc-blue sm:text-3xl sm:tracking-tight lg:bg-transparent">
                    97%
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
