import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
} from "@nextui-org/react";
import { Session } from "next-auth";

type PhoneVerificationModalProps = {
  session: Session | null;
  closeModal: () => void;
};

function sanitizePhoneNumber(phone: string) {
  const phoneTrim = phone.trim();
  if (phoneTrim.startsWith('0')) {
    return '+44' + phoneTrim.substring(1);
  }
  return phoneTrim;
}

const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
  session,
  closeModal,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phoneNumber, setPhoneNumber] = useState<string>(
    session?.user?.phoneNumber || ""
  );
  const [verificationCode, setVerificationCode] = useState("");
  const [page, setPage] = useState("submitNumber");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    onOpen();
    let interval: NodeJS.Timeout | undefined;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    } else if (resendTimer === 0 && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendTimer, onOpen]);

  useEffect(() => {
    if (session?.user?.phoneNumber) {
      setPage("confirmNumber");
    }
  }, [session]);

  const handleNumberSubmit = async () => {
    setPage("confirmNumber");
  };

  const handleNumberConfirm = async () => {
    const res = await fetch("/api/send-verification-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        phoneNumber: sanitizePhoneNumber(phoneNumber),
        userEmail: session?.user?.email,
      }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      console.log(error);
      return;
    }
    setPhoneNumber(sanitizePhoneNumber(phoneNumber));
    setPage("verifyCode");
  };

  const handleVerifyCode = async () => {
    const res = await fetch("/api/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        code: verificationCode,
        userEmail: session?.user?.email,
      }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      console.log(error);
      return;
    }
    await signIn("credentials", {
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });
    closeModal();
    onClose();
  };

  const handleClose = () => {
    closeModal();
    onClose();
  }

  const resendCode = async () => {
    if (resendTimer === 0) {
      await handleNumberConfirm();
      setResendTimer(5);
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalContent className="modal-content">
        {/* Phone Number Submission */}
        {page === "submitNumber" && (
          <>
            <ModalHeader className="text-xl">
              Please Enter Your Phone Number
            </ModalHeader>
            <ModalBody>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
              <Button onClick={handleNumberSubmit}>Submit Number</Button>
            </ModalBody>
            <p className="p-2 px-16 text-center font-semibold text-md">
              We will send a verification code to the provided nnumber and keep
              you updated with your order
            </p>
          </>
        )}

        {/* Confirm Number */}
        {page === "confirmNumber" && (
          <>
            <ModalHeader className="text-xl">
              Confirm Your Phone Number
            </ModalHeader>
            <ModalBody>
              <p>Your phone number: {phoneNumber}</p>
              <Button onClick={handleNumberConfirm}>Send (OTP) Passcode</Button>
            </ModalBody>
          </>
        )}

        {/* Code Verification */}
        {page === "verifyCode" && (
          <>
            <ModalHeader>Enter Verification Code</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Verification code"
              />
              <Button onClick={handleVerifyCode}>Verify</Button>
              {resendTimer === 0 ? (
                <Button onClick={resendCode}>Resend Code</Button>
              ) : (
                <p>Resend available in {resendTimer} seconds</p>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PhoneVerificationModal;
