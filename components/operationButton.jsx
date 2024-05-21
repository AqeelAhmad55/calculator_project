import { ACTIONS } from "@/app/page";
import React from "react";

const OperationButton = ({ operation, dispatch }) => {
  return (
    <div
      className="flex justify-center items-center border-[black] hover:bg-white border"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </div>
  );
};

export default OperationButton;
