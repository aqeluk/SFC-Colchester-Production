"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type LoginModalProps = {
  closeModal: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeModalHandler = () => {
    closeModal();
    onClose();
  };

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} hideCloseButton>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center text-black">
            Login to Southern Fried Chicken!
          </ModalHeader>
          <ModalBody>Hello</ModalBody>
          <ModalFooter className="flex justify-center">
            <Button color="secondary" size="lg" onClick={closeModalHandler}>
              Order As A Guest Instead
            </Button>
            <p>
              Make your experience better with a SFC Account for seamless
              ordering
            </p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
