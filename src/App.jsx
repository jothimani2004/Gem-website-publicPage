import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/layout/NavBar/Navbar.jsx";
import Footer from "./Components/layout/Footer/Footer";
import Loader from "./Components/common/Loader/Loader";
import store from "./app/store.js"; // adjust path if needed
import { Provider } from "react-redux";
import FaqPage from "./pages/Faq/FaqPage.jsx";
import WhatsAppButton from "./Components/common/whatsapp/WhatsAppButton.jsx";
import GemCategory from "./Components/gem/GemCategory/GemCategory.jsx";
import About from "./pages/about/About.jsx";
import MoreGems from "./pages/moregems/MoreGems.jsx";
// Code splitting - dynamically fetching pages only when the user routes to them
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const GemListing = lazy(() => import("./pages/GemListing/GemListing"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        {/* Seamless loading hook while javascript chunks transfer */}
        <Suspense fallback={<Loader text="Loading Experience..." fullScreen={false} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<MoreGems />} />
            <Route path="/:category/:gemName" element={<GemListing />} />
            <Route
              path="/:category/:gemName/:id"
              element={<ProductDetails />}
            />
            <Route
              path="/faq"
              element={<FaqPage />}
            />
            <Route
              path="/about"
              element={<About />}
            />
          </Routes>
        </Suspense>
        <WhatsAppButton />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
