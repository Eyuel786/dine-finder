interface ChangeAction {
  type: "CHANGE";
  payload: { value: string };
}

interface BlurAction {
  type: "BLUR";
}

interface ResetAction {
  type: "RESET";
}

type InputAction = ChangeAction | BlurAction | ResetAction;

export default InputAction;
