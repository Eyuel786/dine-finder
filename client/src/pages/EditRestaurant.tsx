import { Navigate, useParams } from "react-router-dom";
import RestaurantForm from "../components/RestaurantForm";
import { useAppDispatch, useAppSelector } from "../store";
import Restaurant from "../types/Restaurant";
import { sendUpdatedRestaurant } from "../store/restaurants.thunks";

export default function EditRestaurant() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { restaurants, status, message } = useAppSelector(
    (state) => state.restaurants
  );
  const restaurant = restaurants.find((r) => r.id === id);

  const updateRestaurant = (id: string, restaurant: Restaurant) => {
    dispatch(sendUpdatedRestaurant({ id, restaurant }));
  };

  if (!!message && status === "fulfilled") {
    return <Navigate to="/restaurants" replace />;
  }

  return (
    <>
      {restaurant && (
        <RestaurantForm
          restaurant={restaurant}
          updateRestaurant={updateRestaurant}
        />
      )}
    </>
  );
}
