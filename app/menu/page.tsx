import { Category } from "@prisma/client";
import { InternalProduct } from "@/types/types";
import QuickMenu from "@/components/QuickMenu";

const categoryOrder = [
  "Meal Deals",
  "Southern Fried Chicken",
  "Burgers",
  "Kebabs",
  "Wraps",
  "Pizzas",
  "Peri-Peri Chicken",
  "Potatoes and Ribs",
  "Sides",
  "Desserts",
  "Soft Drinks",
  "Alcoholic Drinks",
];

const sortCategories = (categories: Category[]) => {
  return categories.sort((a, b) => {
    return categoryOrder.indexOf(a.title) - categoryOrder.indexOf(b.title);
  });
};

const getData = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const getAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.API_ENDPOINT}/api/menu`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getMealDealData = async () => {
  try {
    const res = await fetch(
      `${process.env.API_ENDPOINT}/api/products?cat=meal-deals`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch meal deal data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const QuickOrderPage = async () => {
  const categories: Category[] = await getData();
  const allProducts: InternalProduct[] = await getAllProducts();
  const sortedCategories = sortCategories(categories);

  // Iterate over products to check for specific titles and fetch data if needed
  for (const product of allProducts) {
    if (
      [
        "Pizza Party Pack",
        "Double Delight Pizza Feast",
        "The Ultimate Trio Pizza",
      ].includes(product.title)
    ) {
      product.mealDealData = await getMealDealData();
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 bg-blue-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h1>
      <h2 className="md:text-xl text-sm text-gray-600 mb-4 text-center md:w-3/4">
        Explore our carefully crafted menu, featuring home-style favorites and
        original recipes, guaranteed to satisfy every appetite
      </h2>
      <div className="w-full max-w-6xl h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <QuickMenu
          allProducts={allProducts}
          sortedCategories={sortedCategories}
        />
      </div>
    </div>
  );
};

export default QuickOrderPage;
