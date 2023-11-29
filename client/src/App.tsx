import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRestaurants from "./pages/AllRestaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import NotFound from "./pages/NotFound";
import AddRestaurant from "./pages/AddRestaurant";
import EditRestaurant from "./pages/EditRestaurant";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchAllRestaurants } from "./store/restaurants.thunks";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import MyAlert from "./components/MyAlert";

const MainContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useAuth(user);

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [fetchAllRestaurants]);

  return (
    <MainContainer>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/restaurants" element={<AllRestaurants />} />
        <Route
          path="/restaurants/new"
          element={
            <ProtectedRoute user={user}>
              <AddRestaurant />
            </ProtectedRoute>
          }
        />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route
          path="/restaurants/:id/edit"
          element={
            <ProtectedRoute user={user}>
              <EditRestaurant />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<div>About us</div>} />
        <Route path="/contact" element={<div>Contact us</div>} />
        <Route
          path="/signin"
          element={
            <AuthRoute user={user}>
              <SignIn />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute user={user}>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MyAlert />
      <Footer />
    </MainContainer>
  );
}

export default App;
