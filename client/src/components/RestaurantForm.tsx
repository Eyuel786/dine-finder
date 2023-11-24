import { Container, TextField, Stack, Button } from "@mui/material";
import { PageTitle } from "../utils/MyStyledComponents";
import { FormEvent } from "react";
import {
  validateAddress,
  validateCuisine,
  validateDescription,
  validateImage,
  validateName,
} from "../utils/restaurant.validators";
import useInputState from "../hooks/useInputState";
import Restaurant, { RestaurantData } from "../types/Restaurant";

interface AddRestaurantAction {
  addRestuarant: (restaurant: RestaurantData) => void;
}

interface EditRestaurantAction {
  restaurant: Restaurant;
  updateRestaurant: (id: string, restaurant: Restaurant) => void;
}

type RestaurantFormProps = AddRestaurantAction | EditRestaurantAction;

export default function RestaurantForm(props: RestaurantFormProps) {
  const isEditing = "restaurant" in props;

  const {
    enteredValue: name,
    inputIsValid: nameIsValid,
    inputHasError: nameHasError,
    errorMessage: nameErrorMessage,
    handleChange: handleNameChange,
    handleBlur: handleNameBlur,
    reset: resetName,
  } = useInputState({
    validator: validateName,
    initVal: isEditing ? props.restaurant.name : "",
  });

  const {
    enteredValue: address,
    inputIsValid: addressIsValid,
    inputHasError: addressHasError,
    errorMessage: addressErrorMessage,
    handleChange: handleAddressChange,
    handleBlur: handleAddressBlur,
    reset: resetAddress,
  } = useInputState({
    validator: validateAddress,
    initVal: isEditing ? props.restaurant.address : "",
  });

  const {
    enteredValue: cuisine,
    inputIsValid: cuisineIsValid,
    inputHasError: cuisineHasError,
    errorMessage: cuisineErrorMessage,
    handleChange: handleCuisineChange,
    handleBlur: handleCuisineBlur,
    reset: resetCuisine,
  } = useInputState({
    validator: validateCuisine,
    initVal: isEditing ? props.restaurant.cuisine : "",
  });

  const {
    enteredValue: image,
    inputIsValid: imageIsValid,
    inputHasError: imageHasError,
    errorMessage: imageErrorMessage,
    handleChange: handleImageChange,
    handleBlur: handleImageBlur,
    reset: resetImage,
  } = useInputState({
    validator: validateImage,
    initVal: isEditing ? props.restaurant.image : "",
  });

  const {
    enteredValue: description,
    inputIsValid: descriptionIsValid,
    inputHasError: descriptionHasError,
    errorMessage: descriptionErrorMessage,
    handleChange: handleDescriptionChange,
    handleBlur: handleDescriptionBlur,
    reset: resetDescription,
  } = useInputState({
    validator: validateDescription,
    initVal: isEditing ? props.restaurant.description : "",
  });

  const formIsValid =
    nameIsValid &&
    addressIsValid &&
    cuisineIsValid &&
    imageIsValid &&
    descriptionIsValid;

  const clearForm = () => {
    resetName();
    resetAddress();
    resetCuisine();
    resetImage();
    resetDescription();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleNameBlur();
    handleAddressBlur();
    handleCuisineBlur();
    handleImageBlur();
    handleDescriptionBlur();

    if (!formIsValid) {
      console.log("Form is invalid");
      return;
    }

    const restaurantData = {
      name: name.trim(),
      address: address.trim(),
      cuisine: cuisine.trim(),
      image: image.trim(),
      description: description.trim(),
    };

    // TODO clone at a deeper level and update
    if (isEditing) {
      props.updateRestaurant(props.restaurant.id, {
        ...props.restaurant,
        ...restaurantData,
      });
    } else {
      props.addRestuarant(restaurantData);
    }

    clearForm();
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 12 }}>
      <PageTitle>{isEditing ? "Edit" : "Add"} Restaurant</PageTitle>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField
            id="name"
            size="small"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            error={nameHasError}
            helperText={nameHasError && nameErrorMessage}
          />
          <TextField
            id="address"
            size="small"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
            onBlur={handleAddressBlur}
            error={addressHasError}
            helperText={addressHasError && addressErrorMessage}
          />
          <TextField
            id="cuisine"
            size="small"
            placeholder="Cuisine"
            value={cuisine}
            onChange={handleCuisineChange}
            onBlur={handleCuisineBlur}
            error={cuisineHasError}
            helperText={cuisineHasError && cuisineErrorMessage}
          />
          <TextField
            id="image"
            size="small"
            placeholder="Image url"
            value={image}
            onChange={handleImageChange}
            onBlur={handleImageBlur}
            error={imageHasError}
            helperText={imageHasError && imageErrorMessage}
          />
          <TextField
            id="description"
            size="small"
            rows={5}
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlur}
            error={descriptionHasError}
            helperText={descriptionHasError && descriptionErrorMessage}
            multiline
          />
        </Stack>
        <div style={{ display: "flex", gap: "0.4rem", marginTop: "2.5rem" }}>
          <Button variant="contained" color="error" onClick={clearForm}>
            Clear
          </Button>
          <Button variant="contained" type="submit">
            {isEditing ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
