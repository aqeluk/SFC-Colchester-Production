import { useState, useEffect } from "react";
import { Sauce } from "@prisma/client";

type Props = {
  sauces: Sauce[];
  defaultSauces: Sauce[];
  onSelect: (selected: string[]) => void;
};

const SauceSelector: React.FC<Props> = ({
  sauces,
  defaultSauces,
  onSelect,
}) => {
  const [selectedSauces, setSelectedSauces] = useState<string[]>(
    defaultSauces.map((s) => s.title)
  );
  const [showSauceCustomisation, setShowSauceCustomisation] = useState(false);

  useEffect(() => {
    onSelect(selectedSauces); // Call the onSelect callback
  }, [selectedSauces, onSelect]);

  const handleSauceSelect = (sauce: Sauce) => {
    const sauceTitle = sauce.title;
    setSelectedSauces((prev) => {
      if (sauceTitle === "No Sauce") {
        return ["No Sauce"];
      } else {
        let updatedSelection = prev.includes("No Sauce") ? [] : [...prev];
        if (updatedSelection.includes(sauceTitle)) {
          updatedSelection = updatedSelection.filter((s) => s !== sauceTitle);
        } else if (updatedSelection.length < 2) {
          updatedSelection.push(sauceTitle);
        } else {
          updatedSelection.shift();
          updatedSelection.push(sauceTitle);
        }
        return updatedSelection;
      }
    });
  };
  

  const toggleSauceCustomisation = () => {
    if (showSauceCustomisation) {
      // Reset to default sauces when setting default
      setSelectedSauces(
        (defaultSauces || []).map((sauce) => sauce.title)
      );
    }
    setShowSauceCustomisation(!showSauceCustomisation);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold w-full">
        {showSauceCustomisation
          ? "Select Sauces"
          : "Default Sauces We Recommend"}
      </h3>

      {!showSauceCustomisation ? (
        <>
          {/* Display default recommended sauces */}
          <div className="flex flex-wrap gap-2">
            {selectedSauces.map((sauceTitle) => (
              <span
                key={sauceTitle}
                className="px-4 py-2 bg-blue-500 text-white border rounded-md"
              >
                {sauceTitle}
              </span>
            ))}
          </div>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white border rounded-md"
            onClick={toggleSauceCustomisation}
          >
            Customise Sauces
          </button>
        </>
      ) : (
        <>
          {/* Full sauce menu for customization */}
          <div className="flex flex-wrap gap-3 mt-4">
            {sauces.filter(sauce => sauce.isAvailable).map((sauce) => (
              <button
                key={sauce.id}
                className={`px-4 py-2 border rounded-md ${
                  selectedSauces.includes(sauce.title)
                    ? "bg-blue-500 text-white"
                    : "bg-blue-200 text-blue-700"
                }`}
                onClick={() => handleSauceSelect(sauce)}
              >
                {sauce.title}
              </button>
            ))}
          </div>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white border rounded-md"
            onClick={toggleSauceCustomisation}
          >
            Set Default Sauces
          </button>
        </>
      )}
    </div>
  );
};

export default SauceSelector;
