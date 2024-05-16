import { useState, useEffect } from "react";
import { Salad } from "@prisma/client";

type Props = {
  salads: Salad[];
  defaultSalads: Salad[];
  onSelect: (selected: string[]) => void;
  productName: string;
};

const SaladSelector: React.FC<Props> = ({
  salads,
  defaultSalads,
  onSelect,
  productName,
}) => {
  const [selectedSalads, setSelectedSalads] = useState<string[]>(
    defaultSalads.map((s) => s.title)
  );
  const [showSaladCustomisation, setShowSaladCustomisation] = useState(false);

  useEffect(() => {
    onSelect(selectedSalads); // Call the onSelect callback
  }, [selectedSalads, onSelect]);

  const handleSaladSelect = (salad: Salad) => {
    const saladTitle = salad.title;
    setSelectedSalads((prev) => {
      if (saladTitle === "All Salad" || saladTitle === "No Salad") {
        return [saladTitle];
      } else {
        const withoutAllOrNoSalad = prev.includes("All Salad") || prev.includes("No Salad") ? [] : prev;
        if (withoutAllOrNoSalad.includes(saladTitle)) {
          // If the salad is already selected, remove it from the selection
          return withoutAllOrNoSalad.filter((item) => item !== saladTitle);
        } else {
          // Otherwise, add the salad to the selection
          return [...withoutAllOrNoSalad, saladTitle];
        }
      }
    });
  };  

  const toggleSaladCustomisation = () => {
    if (showSaladCustomisation) {
      // Reset to default salads when setting default
      setSelectedSalads((defaultSalads || []).map((salad) => salad.title));
    }
    setShowSaladCustomisation(!showSaladCustomisation);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold w-3/4">
        {showSaladCustomisation
          ? "Select Salads"
          : "Default Salads We Recommend for " + productName}
      </h3>

      {!showSaladCustomisation ? (
        <>
          {/* Display default recommended salads */}
          <div className="flex flex-wrap gap-2">
            {selectedSalads.map((saladTitle) => (
              <span
                key={saladTitle}
                className="px-4 py-2 bg-blue-500 text-white border rounded-md"
              >
                {saladTitle}
              </span>
            ))}
          </div>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white border rounded-md"
            onClick={toggleSaladCustomisation}
          >
            Customise Salads
          </button>
        </>
      ) : (
        <>
          {/* Full salad menu for customization */}
          <div className="flex flex-wrap gap-3 mt-4">
            {salads.filter(salad => salad.isAvailable).map((salad) => (
              <button
                key={salad.id}
                className={`px-4 py-2 border rounded-md ${
                  selectedSalads.includes(salad.title)
                    ? "bg-blue-500 text-white"
                    : "bg-blue-200 text-blue-700"
                }`}
                onClick={() => handleSaladSelect(salad)}
              >
                {salad.title}
              </button>
            ))}
          </div>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white border rounded-md"
            onClick={toggleSaladCustomisation}
          >
            Set Default Salads
          </button>
        </>
      )}
    </div>
  );
};

export default SaladSelector;
