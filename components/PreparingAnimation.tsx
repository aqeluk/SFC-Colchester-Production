import Image from "next/image";
export default function PreparingAnimation() {
  return (
    <div className="flex justify-center items-center bg-white">
      <Image
        src="/preparing.gif"
        alt="Loading"
        className="w-auto h-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={'/preparing.gif'}
        width={150}
        height={150}
        unoptimized
      />
    </div>
  );
}
