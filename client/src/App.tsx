import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const appDispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    appDispatch(fetchAllRestaurants());
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/restaurants" element={<AllRestaurants />} />
        <Route path="/restaurants/new" element={<AddRestaurant />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/restaurants/:id/edit" element={<EditRestaurant />} />
        <Route path="/about" element={<div>About us</div>} />
        <Route path="/contact" element={<div>Contact us</div>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
