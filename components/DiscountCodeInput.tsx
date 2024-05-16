import { Button } from '@nextui-org/react';
import React, { useState } from 'react';

type DiscountCodeInputProps = {
  onApply: (code: string) => void;
};

const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({ onApply }) => {
  const [localDiscountCode, setLocalDiscountCode] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalDiscountCode(event.target.value);
  };

  const handleApplyClick = () => {
    onApply(localDiscountCode);
  };

  return (
    <form className="flex items-center">
      <label htmlFor="discount-code" className="font-semibold">Discount Code:</label>
      <input
        type="text"
        id="discount-code"
        name="discountCode"
        placeholder="Enter code"
        className="ml-2 border rounded-md p-2"
        value={localDiscountCode}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleApplyClick}
        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply
      </Button>
    </form>
  );
};

export default DiscountCodeInput;
