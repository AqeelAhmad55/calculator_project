"use client";

import ClearButton from "@/components/clearButton";
import DeleteButton from "@/components/deleteButton";
import DigitButton from "@/components/digitButton";
import EvaluateButton from "@/components/evaluateButton";
import OperationButton from "@/components/operationButton";
import { useReducer } from "react";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overWrite: false,
        };
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      )
        return state;

      return {
        ...state,
        overWrite: true,
        operation: null,
        currentOperand: evaluate(state),
        previousOperand: null,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          currentOperand: null,
          overWrite: false,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.CLEAR:
      return {};
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

export default function Home() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className=" box-border p-20 bg-gradient-to-r from-[#0066AA] to-[#00FF6C] h-screen text-2xl ">
      <div className=" bg-gray-300 grid grid-cols-4 grid-rows-4 mx-72 border-2 border-black">
        <div className="col-span-4 min-h-24 bg-slate-900 flex flex-col items-end justify-around py-2">
          <div className=" text-slate-200 text-xl px-3">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="text-white text-4xl px-3">
            {formatOperand(currentOperand)}
          </div>
        </div>
        <ClearButton operation="AC" dispatch={dispatch} />
        <DeleteButton operation="DEL" dispatch={dispatch} />
        <OperationButton operation="/" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <EvaluateButton operation="=" dispatch={dispatch} />
      </div>
    </div>
  );
}
