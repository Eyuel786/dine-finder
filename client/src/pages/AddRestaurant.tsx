import RestaurantForm from "../components/RestaurantForm";
import { useAppDispatch } from "../store";
import { sendNewRestaurant } from "../store/restaurants.thunks";
import  { RestaurantData } from "../types/Restaurant";

export default function AddRestaurant() {
  const dispatch = useAppDispatch();

  const addNewRestaurant = (restaurant: RestaurantData) =>
    dispatch(sendNewRestaurant(restaurant));

  return <RestaurantForm addRestuarant={addNewRestaurant} />;
}
