import React from "react";
import { ACTIONS } from "@/app/page";

const ClearButton = ({ operation, dispatch }) => {
  return (
    <button
      className="px-6 py-6 border-[black] hover:bg-white border col-span-2"
      onClick={() => dispatch({ type: ACTIONS.CLEAR })}
    >
      {operation}
    </button>
  );
};

export default ClearButton;
