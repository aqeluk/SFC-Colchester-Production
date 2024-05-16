import Image from "next/image";
import { prisma } from "@/utils/connect";

export default async function Featured() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
  });

  return (
    <section className="m-2 border-sfc-blue rounded-md border-large">
      <h1 className="text-center text-lg md:text-2xl md:py-8 text-white bg-sfc-blue font-extrabold py-4">
        Swipe Right To Scroll Through Our Featured Products
      </h1>
      <div className="overflow-x-scroll text-blue-500">
        <div className="flex w-max p-1 gap-2">
          {featuredProducts &&
            featuredProducts.map((item) => (
              <div
                key={item.id}
                className="flex flex-col border-medium rounded-xl items-center max-w-[300px] md:max-w-screen-sm hover:bg-fuchsia-50 transition duration-300 space-y-2"
              >
                {/* IMAGE CONTAINER with fixed height */}
                {item.img && (
                  <>
                    <div className="relative w-screen max-w-[300px] md:max-w-screen-sm md:h-80 h-60 flex items-center justify-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover rounded-t-xl"
                        sizes="100vw"
                      />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold uppercase">
                      {item.title}
                    </h3>
                  </>
                )}
                {/* TEXT CONTAINER - flex-grow allows this container to expand and push the price and button to the bottom */}
                <div className="md:w-3/4 flex flex-col items-center justify-center text-center flex-grow">
                  <h4 className="px-4 md:text-xl">{item.desc}</h4>
                </div>
                {/* PRICE AND BUTTON CONTAINER */}
                <div className="w-full md:w-1/4 py-8 flex flex-col items-center justify-end">
                  <span className="text-2xl font-bold">
                    £{item.price.toFixed(2)}
                  </span>
                  <button className="bg-sfc-blue text-white py-2 px-4 rounded-md font-bold transition hover:scale-105 mt-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
