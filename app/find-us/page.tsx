import AboutSFCTitle from "@/components/AboutSFCTitle";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="container mx-auto px-4">
      <AboutSFCTitle
        title="Come to SFC Colchester: Your Go-To for Mouthwatering American Cuisine"
        subtitle="Craving something delicious? Find us and satisfy your taste buds!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2462.5534688066173!2d0.9035299999999998!3d51.88736299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d904f96d10c96f%3A0xa65cbdd1099d5d7f!2sSouthern%20Fried%20Chicken%20-%20American!5e0!3m2!1sen!2suk!4v1693219964676!5m2!1sen!2suk"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute bottom-0 inset-x-0 p-4 flex justify-center">
            <Link
              href="https://www.google.com/maps/dir//Southern+Fried+Chicken+-+American+37A+St+Botolph's+St+Colchester+CO2+7EA/@51.887363,0.90353,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x47d904f96d10c96f:0xa65cbdd1099d5d7f"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded transform transition hover:scale-105 hover:bg-sfc-blue"
            >
              Get Directions
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative h-[240px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/SFCShop.jpeg"
              alt="Front of SFC Colchester"
              fill
              sizes="100vw"
              className="object-cover"
              />
          </div>
          <div className="relative h-[240px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/SFCShopSideOn.png"
              alt="Side Shot of SFC Colchester"
              fill
              sizes="100vw"
              className="object-cover"
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
