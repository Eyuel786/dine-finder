import RestaurantForm from "../components/RestaurantForm";
import { useAppDispatch } from "../store";
import { sendNewRestaurant } from "../store/restaurants.thunks";
import Restaurant from "../types/Restaurant";

export default function AddRestaurant() {
  const dispatch = useAppDispatch();

  const addNewRestaurant = (restaurant: Omit<Restaurant, "id">) =>
    dispatch(sendNewRestaurant(restaurant));

  return <RestaurantForm addRestuarant={addNewRestaurant} />;
}
