import RestaurantForm from "../components/RestaurantForm";
import { restaurantsActions, useAppDispatch } from "../store";
import Restaurant from "../types/Restaurant";

export default function AddRestaurant() {
  const dispatch = useAppDispatch();

  const addNewRestaurant = (restaurant: Omit<Restaurant, "id">) =>
    dispatch(restaurantsActions.add({ restaurant }));

  return <RestaurantForm addRestuarant={addNewRestaurant} />;
}
