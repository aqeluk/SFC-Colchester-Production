import Image from "next/image";
export default function DeliveringAnimation() {
  return (
    <div className="flex justify-center items-center bg-white">
      <Image
        src="/delivering.gif"
        alt="Loading"
        className="w-auto h-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={'/delivering.gif'}
        width={150}
        height={150}
        unoptimized
      />
    </div>
  );
}
