import InputAction from "../types/InputAction";
import InputState from "../types/InputState";

export default function inputReducer(
  state: InputState,
  action: InputAction
): InputState {
  switch (action.type) {
    case "CHANGE":
      return {
        enteredValue: action.payload.value,
        inputIsBlurred: state.inputIsBlurred,
      };
    case "BLUR":
      return {
        enteredValue: state.enteredValue,
        inputIsBlurred: true,
      };
    case "RESET":
      return {
        enteredValue: "",
        inputIsBlurred: false,
      };
  }
}
