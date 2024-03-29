import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../store";
import { PageTitle } from "../utils/MyStyledComponents";
import { useNavigate } from "react-router-dom";

const MyContainer = styled("div")(() => ({
  minHeight: "calc(100vh - 550px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CardTitle = styled(Typography)(() => ({
  fontSize: "1.4rem",
  fontWeight: 600,
})) as typeof Typography;

const CardText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  margin: "1rem 0",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  overflow: "hidden",
})) as typeof Typography;

export default function AllRestaurants() {
  const navigate = useNavigate();
  const { restaurants, status } = useAppSelector((state) => state.restaurants);

  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 12 }}>
      <PageTitle>All Restaurants</PageTitle>
      {status === "pending" && (
        <MyContainer>
          <CircularProgress />
        </MyContainer>
      )}
      {status !== "pending" && !restaurants.length && (
        <MyContainer>
          <Typography variant="h5">No Restaurants Found</Typography>
        </MyContainer>
      )}
      {status !== "pending" &&
        !!restaurants.length &&
        restaurants.map((r, index) => (
          <div key={r.id}>
            <Card elevation={0}>
              <Grid container>
                <Grid item xs={12} sm={5}>
                  <CardMedia
                    component="img"
                    src={r.image}
                    alt={r.name}
                    height="210"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <CardContent>
                    <CardTitle>{r.name}</CardTitle>
                    <Typography variant="subtitle2">{r.cuisine}</Typography>
                    <CardText>{r.description}</CardText>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/restaurants/${r.id}`)}
                    >
                      View {r.name}
                    </Button>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            {index < restaurants.length - 1 && <Divider sx={{ my: 2 }} />}
          </div>
        ))}
    </Container>
  );
}
