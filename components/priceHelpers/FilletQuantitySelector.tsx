import React from 'react';

type Props = {
  filletQuantity: number;
  setFilletQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const FilletQuantitySelector: React.FC<Props> = ({ filletQuantity, setFilletQuantity }) => {
  return (
    <div className="flex justify-between w-full p-3 ring-1 ring-blue-700 rounded-xl bg-blue-500">
      <span className="text-lg text-white">Fillet Quantity</span>
      <div className="flex gap-4 items-center text-white text-xl">
        <button onClick={() => setFilletQuantity(prev => (prev > 1 ? prev - 1 : 1))}>
          {"<"}
        </button>
        <span>{filletQuantity}</span>
        <button onClick={() => setFilletQuantity(prev => (prev < 9 ? prev + 1 : 9))}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default FilletQuantitySelector;
