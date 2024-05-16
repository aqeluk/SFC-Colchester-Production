"use client";

import useCartStore from "@/utils/store";
import { usePathname } from "next/navigation";

function OrderModalWrapper({ children }: { children: React.ReactNode }) {
  const { deliveryMethod } = useCartStore();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/cart") {
    return null;
  } else if (deliveryMethod) {
    return null;
  }
  return <>{children}</>;
}

export default OrderModalWrapper;
