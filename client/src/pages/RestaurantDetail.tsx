import { Container, Typography, Divider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, Navigate, useParams } from "react-router-dom";
import { restaurantsActions, useAppDispatch, useAppSelector } from "../store";

const RestaurantName = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "2rem",
}));

export default function RestaurantDetail() {
  const { id } = useParams();
  const { restaurants } = useAppSelector((state) => state.restaurants);
  const dispatch = useAppDispatch();
  const restaurant = restaurants.find((r) => r.id === id);

  // TODO Handle cases when restaurant is not found and when it reloads

  const removeRestaurant = () =>
    dispatch(restaurantsActions.remove({ id: restaurant!.id }));

  if (!restaurant) return <Navigate to="/notfound" replace />;

  return (
    <Container maxWidth="sm" sx={{ pt: 4, pb: 12 }}>
      <RestaurantName>{restaurant.name}</RestaurantName>
      <Typography variant="subtitle1" color="text.secondary">
        {restaurant.cuisine}
      </Typography>
      <Divider sx={{ my: 3, mb: 5 }} />
      <img
        style={{ objectFit: "cover", width: "100%" }}
        src={restaurant.image}
        alt={restaurant.name}
      />
      <Typography sx={{ my: 4 }}>{restaurant.description}</Typography>
      <div style={{ display: "flex", gap: "0.4rem" }}>
        <Button
          variant="contained"
          component={Link}
          to={`/restaurants/${restaurant.id}/edit`}
        >
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={removeRestaurant}>
          Delete
        </Button>
      </div>
    </Container>
  );
}
