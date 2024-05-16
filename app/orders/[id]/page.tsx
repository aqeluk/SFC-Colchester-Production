import DeliveringAnimation from "@/components/DeliveringAnimation";
import OrderReadyAnimation from "@/components/OrderReadyAnimation";
import PreparingAnimation from "@/components/PreparingAnimation";
import ProcessedAnimation from "@/components/ProcessedAnimation";
import { OrderType } from "@/types/types";
import { Card, CardBody } from "@nextui-org/react";
import { Suspense } from "react";

const getData = async (id: string) => {
  const res = await fetch(`${process.env.API_ENDPOINT}/api/orders/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const getAddress = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}/api/address`, {
    cache: "no-store",
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const OrderSummary = async ({ params }: { params: { id: string } }) => {
  const order: OrderType = await getData(params.id);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardBody>
        <h2 className="text-4xl text-center font-extrabold mt-4">Order Summary:</h2>
        {order.orderStatus === "Preparing" && (
          <Suspense fallback={<p>Loading video...</p>}>
            <PreparingAnimation />
          </Suspense>
        )}
        {order.orderStatus === "On The Way" && (
          <Suspense fallback={<p>Loading video...</p>}>
            <DeliveringAnimation />
          </Suspense>
        )}
        {order.orderStatus === "Ready To Collect" && (
          <Suspense fallback={<p>Loading video...</p>}>
            <OrderReadyAnimation />
          </Suspense>
        )}
        {order.orderStatus === "Processed" && (
          <Suspense fallback={<p>Loading video...</p>}>
            <ProcessedAnimation />
          </Suspense>
        )}
        <p className="text-center text-xl font-bold">Order {order.orderStatus}</p>
        <div>
          <h3>Products:</h3>
          <ul>
            {order.products.map((product: any) => (
              <li key={product.id}>
                {product.name} - £{product.price}
              </li>
            ))}
          </ul>
          <p>User Email: {order.userEmail}</p>
          <p>Phone Number: {order.phoneNumber}</p>
          <p>Due Time: {order.deliveryTime.toString()}</p>
          <p>Payment Status: {order.paymentStatus}</p>
          <p>Order Notes: {order.orderNotes}</p>
          {order.ukAdresssId && <p>Delivery Address: {order.ukAdresssId}</p>}
          <p>Subtotal: £{order.subtotal}</p>
          <p>Delivery Charge: £{order.deliveryCharge}</p>
          {order.discountCode && (
            <>
              <p>Discount Code: {order.discountCode}</p>
              <p>Discount Amount: {order.discountedAmount?.toFixed(2)}</p>
            </>
          )}
          <p>Total Price: £{order.totalPrice}</p>
          <p>Delivery Method: {order.deliveryMethod}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Order Created At: {order.createdAt.toString()}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderSummary;
