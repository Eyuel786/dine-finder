import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/restaurants" element={<div>All Restaurants</div>} />
        <Route path="/restaurants/new" element={<div>Add Restaurant</div>} />
        <Route path="/about" element={<div>About us</div>} />
        <Route path="/contact" element={<div>Contact us</div>} />
        <Route path="/signin" element={<div>Sign in</div>} />
        <Route path="*" element={<div>Path not found</div>} />
      </Routes>
    </>
  );
}

export default App;
