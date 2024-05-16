"use client";

import { useEffect } from "react";

type SuccessHelperProps = {
  payment_intent: string;
  onSuccess: () => void;
};

const SuccessHelper: React.FC<SuccessHelperProps> = ({
  payment_intent,
  onSuccess,
}) => {
  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/confirm/${payment_intent}`,
          {
            method: "PUT",
          }
        );
        onSuccess();
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [payment_intent, onSuccess]);

  return null; 
};

export default SuccessHelper;
