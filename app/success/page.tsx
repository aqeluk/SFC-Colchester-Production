"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  console.log(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/confirm/${payment_intent}`
  );

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/confirm/${payment_intent}`,
          {
            method: "PUT",
          }
        );
        console.log("Request made");
        console.log(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/confirm/${payment_intent}`
        );
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
        <ConfettiExplosion className="absolute m-auto" />
      </div>
    </>
  );
};

export default SuccessPage;
