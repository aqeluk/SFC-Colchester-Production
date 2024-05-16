import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

type AddressProps = {
  session: any;
  deliveryAddress: any;
};

const AddressForm: React.FC<AddressProps> = ({ session, deliveryAddress }) => {
  return (
    <>
      <h3>Address</h3>
      <AddressElement
        options={{ 
          mode: "shipping",
          fields: {
            phone: "always"
          },
          defaultValues: {
              name: session?.user?.name || undefined,
              phone: session?.user?.phoneNumber || undefined,
              address: {
                line1: deliveryAddress?.line_1 || deliveryAddress?.formatted_address.formatted_address_0 || undefined,
                line2: deliveryAddress?.line_2 || deliveryAddress?.formatted_address.formatted_address_1 || undefined,
                city: deliveryAddress?.town_or_city || undefined,
                state: deliveryAddress?.county || undefined,
                postal_code: deliveryAddress?.postcode || undefined,
                country: "GB",
              },
            }
         }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
          }
        }}
      />
    </>
  )
};

export default AddressForm;
