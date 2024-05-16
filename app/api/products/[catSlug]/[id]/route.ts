import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE PRODUCT
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string, catSlug: string } }
) => {
  const { id, catSlug } = params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        defaultSalads: true,
        defaultSauces: true,
        salads: true,
        sauces: true,
        genericMeal: {
          include: {
            DrinkOptions: true,
          }
        },
        specificMeal: true,
        specificExtra: true,
        // Conditionally include pizza-related fields
        ...(catSlug === 'pizzas' && {
          defaultPizzaToppings: true,
          pizzaToppings: true,
        }),
      },
    });
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
