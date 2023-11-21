import {
  checkEmail,
  checkLength,
  checkPassword,
  checkRequired,
} from "./inputChecks";

export const validateUsername = (value: string) => {
  const username = value.trim();
  let errorMessage = checkRequired("Username", username);
  if (errorMessage) return errorMessage;
  errorMessage = checkLength("Username", username, 3, 50);
  return errorMessage;
};

export const validateEmail = (value: string) => {
  const email = value.trim();
  let errorMessage = checkRequired("Email", email);
  if (errorMessage) return errorMessage;
  errorMessage = checkEmail(email);
  return errorMessage;
};

export const validatePassword = (value: string) => {
  const password = value.trim();
  let errorMessage = checkRequired("Password", password);
  if (errorMessage) return errorMessage;
  errorMessage = checkPassword(password);
  return errorMessage;
};
