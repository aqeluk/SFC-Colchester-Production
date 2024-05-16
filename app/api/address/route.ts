import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// CREATE or FIND ADDRESS
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const body = await req.json();
      const {
        line_1,
        line_2,
        postcode,
        county,
        town_or_city,
        formatted_address,
      } = body;

      const formattedAddressString =
        Object.values(formatted_address).join(", ");

      // Check if the address already exists
      let address = await prisma.uKAddress.findFirst({
        where: {
          line1: line_1,
          line2: line_2,
          postcode,
          county,
          town_or_city,
          formatted_address: formattedAddressString,
        },
      });

      if (!address) {
        address = await prisma.uKAddress.create({
          data: {
            line1: line_1,
            line2: line_2,
            postcode,
            county,
            town_or_city,
            formatted_address: formattedAddressString,
          },
        });
      }

      return new NextResponse(JSON.stringify(address), { status: 201 });
    } catch (err) {
      console.error("Error handling address:", err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};
