import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// CHECK IF DISCOUNT VALID AND RETURN MULTIPLIER
export const GET = async (
  req: NextRequest,
  { params }: { params: { code: string } }
) => {
  const { code } = params;

  try {
    const discountCode = await prisma.discountCode.findUnique({
      where: {
        code: code
      },
    });
    // Check if the discount code exists and is active
    if (discountCode && discountCode.isActive) {
        return new NextResponse(
          JSON.stringify(discountCode),
          { status: 200 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or inactive discount code" }),
          { status: 404 }
        );
      }
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
