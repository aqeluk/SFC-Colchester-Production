import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
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
        defaultPizzaToppings: true,
        pizzaToppings: true,
      },
    });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};