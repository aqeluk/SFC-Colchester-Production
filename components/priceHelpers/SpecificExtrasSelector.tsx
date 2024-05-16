import { SpecificExtra } from "@prisma/client";
import { SpecificMeal } from "@/types/types";
import { renderPrice } from "@/utils/utils";

type Props = {
  specificExtras: SpecificExtra[] | undefined;
  selectedExtras: SpecificExtra[];
  onSelect: (selected: SpecificExtra[]) => void;
  isPotatoes: boolean;
  isKebab: boolean;
  canSelectExtra: boolean;
  selectedSpecificMeal: SpecificMeal | null;
};

const SpecificExtrasSelector: React.FC<Props> = ({
  specificExtras,
  selectedExtras,
  onSelect,
  isKebab,
  isPotatoes,
  canSelectExtra,
  selectedSpecificMeal,
}) => {

  // Update the titles for jacket potatoes
  const updatedExtras = specificExtras?.map(extra => {
    if (isPotatoes && selectedSpecificMeal && extra.title === `Add ${selectedSpecificMeal.title}`) {
      return { ...extra, title: `Add Extra ${selectedSpecificMeal.title}` };
    }
    return extra;
  });
  
  const handleExtraSelect = (extra: SpecificExtra) => {
    let updatedExtras = [...selectedExtras];

    if (isKebab) {
      const hasAddChips = updatedExtras.some((e) => e.title === "Add Chips");
      const pitta = specificExtras?.find((e) => e.title === "Pitta Bread");

      if (extra.title === "Add Chips") {
        if (hasAddChips) {
          // Deselect Add Chips and revert to original Pitta Bread
          updatedExtras = updatedExtras.filter((e) => e.title !== "Add Chips");
          if (pitta) {
            pitta.price = 0;
            updatedExtras = updatedExtras.filter(
              (e) => e.title !== "No Pitta Bread"
            );
            updatedExtras.push(pitta);
          }
        } else {
          // Select Add Chips and switch to No Pitta Bread
          updatedExtras.push(extra);
          if (pitta) {
            pitta.price = 1;
            updatedExtras = updatedExtras.filter(
              (e) => e.title !== "Pitta Bread"
            );
            const noPitta = specificExtras?.find(
              (e) => e.title === "No Pitta Bread"
            );
            if (noPitta) updatedExtras.push(noPitta);
          }
        }
      } else if (
        extra.title === "Pitta Bread" ||
        extra.title === "No Pitta Bread"
      ) {
        updatedExtras = updatedExtras.filter(
          (e) => e.title !== "Pitta Bread" && e.title !== "No Pitta Bread"
        );
        if (!updatedExtras.some((e) => e.title === extra.title)) {
          updatedExtras.push(extra);
        }
      } else if (canSelectExtra) {
        // Toggle selection of other extras
        const extraIndex = updatedExtras.findIndex((e) => e.id === extra.id);
        if (extraIndex >= 0) {
          updatedExtras.splice(extraIndex, 1);
        } else {
          updatedExtras.push(extra);
        }
      }
      onSelect(updatedExtras);
    } else if (canSelectExtra) {
      // Handling selection for non-kebabs or when selectableSpecificExtras is true
      const extraIndex = updatedExtras.findIndex((e) => e.id === extra.id);
      if (extraIndex >= 0) {
        updatedExtras.splice(extraIndex, 1);
      } else {
        updatedExtras.push(extra);
      }
      onSelect(updatedExtras);
    } else {
      // Default case if not a kebab and canSelectExtra is false
      onSelect([extra]);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Have a pick at extras</h3>
      <div className="flex flex-wrap gap-4">
        {updatedExtras?.filter(extra => extra.isAvailable).map((extra) => (
          <button
            key={extra.id}
            className={`min-w-[6rem] p-2 ring-1 ring-blue-600 rounded-md ${
              selectedExtras.some(selectedExtra => selectedExtra.id === extra.id)
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
            onClick={() => handleExtraSelect(extra)}
          >
            {extra.title}
            <p className="text-xs">{renderPrice(extra.price)}</p>
          </button>
        ))}
      </div>
    </div>
  );
  
};

export default SpecificExtrasSelector;
