"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      if (!id) return;
      if (clientSecret === "") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/create-intent/${id}`,
            {
              method: "POST",
            }
          );
          const data = await res.json();
          setClientSecret(data.clientSecret);
        } catch (err) {
          console.log(err);
        }
      }
    };

    makeRequest();
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PayPage;
