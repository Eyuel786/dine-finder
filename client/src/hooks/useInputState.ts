import { ChangeEvent, useReducer } from "react";
import inputReducer from "../reducers/inputReducer";

interface InputStateParams {
  initVal?: string;
  validator: (value: string) => string | null;
}

export default function useInputState({
  initVal = "",
  validator,
}: InputStateParams) {
  const [state, dispatch] = useReducer(inputReducer, {
    enteredValue: initVal,
    inputIsBlurred: false,
  });

  const { enteredValue, inputIsBlurred } = state;

  const errorMessage = validator(enteredValue);
  const inputIsValid = !errorMessage;
  const inputHasError = inputIsBlurred && !!errorMessage;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "CHANGE", payload: { value: e.target.value } });
  const handleBlur = () => dispatch({ type: "BLUR" });
  const reset = () => dispatch({ type: "RESET" });

  return {
    enteredValue,
    errorMessage,
    inputIsValid,
    inputHasError,
    handleChange,
    handleBlur,
    reset,
  };
}
