import { InternalProduct } from "@/types/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Category } from "@prisma/client";
import React from "react";

type AdminUpdateItemProps = {
  product: InternalProduct;
  categories: Category[];
};

const AdminUpdateItem: React.FC<AdminUpdateItemProps> = ({
  product,
  categories,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleUpdate() {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Button className="sm:text-sm" size="sm" color="primary" onPress={onOpen}>
        Edit Item
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl">
                <h2>Title</h2>
                <Input value={product.title} />
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 text-center">
                <h2>Description</h2>
                <Input value={product.desc} />
                <h2>Price</h2>
                <Input value={product.price.toFixed(2)} />
                <h2>Image</h2>
                <Input value={product.img || ""} />
                <h2>Category: {product.catSlug}</h2>
                <Dropdown>
                  <DropdownTrigger>
                    <button className="bg-sfc-blue text-white rounded-full text-lg">
                      Change Category
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    {categories.map((category) => (
                      <DropdownItem key={category.title}>{category.title}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <h2>Is Featured Item (Showing On Home Page): {product.isFeatured}</h2>
                <Dropdown>
                  <DropdownTrigger>
                    <button className="bg-sfc-blue text-white rounded-full text-lg">
                      Change isFeatured
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="isFeaturedTrue">True</DropdownItem>
                    <DropdownItem key="isFeaturedFalse">False</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <h2>Is Available (For Sale): {product.isAvailable}</h2>
                <Dropdown>
                  <DropdownTrigger>
                    <button className="bg-sfc-blue text-white rounded-full text-lg">
                      Change Availability
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="isAvailableTrue">True</DropdownItem>
                    <DropdownItem key="isAvailable">False</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="uppercase w-56 bg-blue-600 text-white p-3 ring-1 ring-blue-600 rounded-r-xl"
                  onPress={() => {
                    handleUpdate();
                    onClose();
                  }}
                >
                  Update Item
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminUpdateItem;
