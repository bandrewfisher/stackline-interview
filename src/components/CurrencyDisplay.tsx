import React from "react";
import { NumericFormat } from "react-number-format";

interface CurrencyDisplayProps {
  value: number;
}

function CurrencyDisplay({ value }: CurrencyDisplayProps) {
  return (
    <NumericFormat
      prefix="$"
      displayType="text"
      value={value}
      thousandSeparator=","
    />
  );
}

export default CurrencyDisplay;
