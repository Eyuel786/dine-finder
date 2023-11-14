export const checkRequired = (inputName: string, value: string) => {
  if (!value) {
    return `${inputName} is required`;
  }

  return null;
};

export const checkLength = (
  inputName: string,
  value: string,
  min: number,
  max: number
) => {
  if (value.length < min) {
    return `${inputName} must be greater than ${min} characters`;
  } else if (value.length > max) {
    return `${inputName} must be less than ${max} characters`;
  } else {
    return null;
  }
};
