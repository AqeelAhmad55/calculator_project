import React from "react";
import { ACTIONS } from "@/app/page";

const DigitButton = ({ digit, dispatch }) => {
  return (
    <button
      className="px-6 py-6 border-[black] hover:bg-white border"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
