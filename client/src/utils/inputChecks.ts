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

export const checkEmail = (email: string) => {
  const emailIsValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  if (!emailIsValid) return "Please enter a valid email";
  return null;
};

export const checkPassword = (password: string) => {
  const passwordIsValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{7,15}$/.test(password);
  if (!passwordIsValid)
    return "Password needs to have a number, small letter, capital letter and special symbol";
  return null;
};
