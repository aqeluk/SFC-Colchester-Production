import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  let cat = searchParams.get("cat");
  let mealDealPizzas = false;
  if (cat === 'meal-deals') {
    mealDealPizzas = true;
    cat = "pizzas"
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
      include: {
        specificMeal: true,
        specificExtra: true,
        // Conditionally include pizza-related fields for Meal Deals
        ...(mealDealPizzas && {
          defaultPizzaToppings: true,
          pizzaToppings: true,
        }),
      }
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