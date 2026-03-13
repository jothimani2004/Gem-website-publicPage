import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./Components/layout/NavBar/Navbar.jsx";
import Footer from "./Components/layout/Footer/Footer";
import GemListing from "./pages/GemListing/GemListing";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import store from "./app/store.js"; // adjust path if needed
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:gemName" element={<GemListing />} />
          <Route
  path="/:category/:gemName/:id"
  element={<ProductDetails />}
/>

        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
