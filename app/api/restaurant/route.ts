import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET RESTAURANT AVAILABILITY PRODUCT
export const GET = async (
  req: NextRequest,
) => {
  try {
    const restaurant = await prisma.restaurant.findFirst({
      include: {
        deliveryTimes: true
      }
    });
    return new NextResponse(JSON.stringify(restaurant), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
