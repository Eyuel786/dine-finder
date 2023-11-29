import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store";
import { restaurantsActions } from "../store/restaurants.slice";
import { authActions } from "../store/auth.slice";

export default function MyAlert() {
  const dispatch = useAppDispatch();
  const { message: restaurantMessage, status: restaurantStatus } =
    useAppSelector((state) => state.restaurants);
  const { message: authMessage, status: authStatus } = useAppSelector(
    (state) => state.auth
  );

  const message = restaurantMessage || authMessage;
  const status =
    (restaurantMessage && restaurantStatus) || (authMessage && authStatus);

  const alertSeverity = status === "rejected" ? "error" : "success";

  const handleClose = () => {
    if (restaurantMessage) {
      dispatch(restaurantsActions.resetMessage());
    } else if (authMessage) {
      dispatch(authActions.resetMessage());
    }
  };

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={handleClose}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert
        onClose={handleClose}
        severity={alertSeverity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
