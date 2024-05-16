import { renderPrice } from "@/utils/utils";
import { SpecificMeal } from "@/types/types";

type Props = {
  specificMeals: SpecificMeal[] | undefined;
  selectedSpecificMeal: SpecificMeal | null;
  onSelect: (selected: SpecificMeal) => void;
  productName: string;
};

const SpecificMealSelector: React.FC<Props> = ({
  specificMeals,
  selectedSpecificMeal,
  onSelect,
  productName,
}) => {
  const handleSpecificMealSelect = (meal: SpecificMeal) => {
    if (selectedSpecificMeal !== meal) {
      onSelect(meal);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Select a type of {productName}</h3>
      <div className="flex flex-wrap gap-3">
        {specificMeals?.map((meal) => (
          <button
            key={meal.id}
            className={`min-w-[6rem] p-2 ring-1 ring-blue-600 rounded-md ${
              selectedSpecificMeal === meal
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
            onClick={() => handleSpecificMealSelect(meal)}
          >
            {meal.title}
            <p className="text-xs">
              {meal.price > 0 ? renderPrice(meal.price) : ""}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecificMealSelector;
