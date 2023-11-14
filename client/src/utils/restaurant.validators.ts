import { checkLength, checkRequired } from "./inputChecks";

export const validateName = (value: string) => {
  const name = value.trim();
  let errorMessage = checkRequired("Name", name);
  if (errorMessage) return errorMessage;
  errorMessage = checkLength("Name", name, 3, 40);
  return errorMessage;
};

export const validateAddress = (value: string) => {
  const address = value.trim();
  let errorMessage = checkRequired("Address", address);
  if (errorMessage) return errorMessage;
  errorMessage = checkLength("Address", address, 3, 50);
  return errorMessage;
};

export const validateImage = (value: string) => {
  const image = value.trim();
  let errorMessage = checkRequired("Image", image);
  return errorMessage;
};

export const validateCuisine = (value: string) => {
  const cuisine = value.trim();
  let errorMessage = checkRequired("Cuisine", cuisine);
  if (errorMessage) return errorMessage;
  errorMessage = checkLength("Cuisine", cuisine, 3, 50);
  return errorMessage;
};

export const validateDescription = (value: string) => {
  const description = value.trim();
  let errorMessage = checkRequired("Description", description);
  if (errorMessage) return errorMessage;
  errorMessage = checkLength("Description", description, 50, 1000);
  return errorMessage;
};
