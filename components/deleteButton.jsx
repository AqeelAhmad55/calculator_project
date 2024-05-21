import React from "react";
import { ACTIONS } from "@/app/page";

const DeleteButton = ({ operation, dispatch }) => {
  return (
    <button
      className="px-6 py-6 border-[black] hover:bg-white border"
      onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
    >
      {operation}
    </button>
  );
};

export default DeleteButton;
