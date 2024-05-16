import { DrinkOption } from '@prisma/client';
import { GenericMeal } from '@/types/types';

type Props = {
    genericMeals: GenericMeal[];
    selectedGenericMeal: GenericMeal | null;
    onSelect: (selectedMeal: GenericMeal | null, drinkOptions: DrinkOption[] | null) => void;
    isFamilyBucket: boolean; 
  };

const GenericMealSelector: React.FC<Props> = ({
    genericMeals,
    selectedGenericMeal,
    onSelect,
    isFamilyBucket,
}) => {
  
    const handleGenericMealSelect = (meal: GenericMeal) => {
        if (isFamilyBucket && genericMeals.length === 1) {
          return; // No selection change if it's a single-option family bucket
        }
    
        if (selectedGenericMeal === meal) {
          onSelect(null, null); // Deselect and clear drink if the same meal is clicked
        } else {
          onSelect(meal, meal.DrinkOptions); // Select the meal and provide its drink options
        }
      };

      return (
        <div>
          <h3 className="text-lg font-semibold">Want to make it a meal?</h3>
          <div className="flex flex-wrap gap-4">
            {genericMeals.map((meal) => (
              <button
                key={meal.id}
                className={`min-w-[6rem] p-2 ring-1 ring-blue-600 rounded-md ${
                  selectedGenericMeal === meal ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                }`}
                onClick={() => handleGenericMealSelect(meal)}
              >
                {meal.title}
                <p className="text-xs">{meal.price > 0 ? `+ £${meal.price.toFixed(2)}` : ""}</p>
              </button>
            ))}
          </div>
        </div>
      );
};

export default GenericMealSelector;
