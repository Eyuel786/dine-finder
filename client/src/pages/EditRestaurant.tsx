import { useParams } from "react-router-dom";
import RestaurantForm from "../components/RestaurantForm";
import { restaurantsActions, useAppDispatch, useAppSelector } from "../store";
import Restaurant from "../types/Restaurant";

export default function EditRestaurant() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const restaurants = useAppSelector((state) => state.restaurants.restaurants);
  const restaurant = restaurants.find((r) => r.id === id);

  const updateRestaurant = (id: string, restaurant: Restaurant) =>
    dispatch(restaurantsActions.update({ id, restaurant }));

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
