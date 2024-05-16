import Image from "next/image";
import CountDown from "./CountDown";

export default function Offer() {
  return (
    <section className="h-screen bg-gradient-to-b from-black to-orange-400 flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] min-h-[800px] md:min-h-0 md:max-h-[550px]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Deal of the Week!
        </h1>
        <h2 className="text-white text-4xl font-bold xl:text-5xl">
          Manhatten Burger & French Fries Meal
        </h2>
        <p className="text-white xl:text-xl">
          Grab our limited-time offer! A mouthwatering combo to satisfy your
          cravings
        </p>
        <CountDown />
        <button className="bg-sfc-blue text-2xl text-white font-bold rounded-md py-3 px-6 mt-4 hover:bg-blue-600 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transform transition hover:scale-105">
          Try Now
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image
          src="/offerProduct.png"
          alt="Delicious Burger & French Fry Combo"
          className="object-contain w-full h-full"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </section>
  );
}
