import { Navigate } from "react-router-dom";
import RestaurantForm from "../components/RestaurantForm";
import { useAppDispatch, useAppSelector } from "../store";
import { sendNewRestaurant } from "../store/restaurants.thunks";
import { RestaurantData } from "../types/Restaurant";

export default function AddRestaurant() {
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state) => state.restaurants);

  const addNewRestaurant = (restaurant: RestaurantData) => {
    dispatch(sendNewRestaurant(restaurant));
  };

  if (!!message && status === "fulfilled") {
    return <Navigate to="/restaurants" replace />;
  }

  return <RestaurantForm addRestuarant={addNewRestaurant} />;
}
