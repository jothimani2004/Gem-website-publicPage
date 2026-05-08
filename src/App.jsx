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
import NotFoundPage from "./pages/NotFound/NotFound.jsx";

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
           <Route path="/Precious" element={<MoreGems category="Precious" />} />

<Route path="/Semi-Precious" element={<MoreGems category="Semi-Precious"/>} />

<Route path="/Precious/:gemName" element={<GemListing category="Precious"/>} />
<Route path="/Semi-Precious/:gemName" element={<GemListing category="Semi-Precious"/>} />

<Route
  path="/Precious/:gemName/:id"
  element={<ProductDetails category="Precious"/>}
/>

<Route
  path="/Semi-Precious/:gemName/:id"
  element={<ProductDetails category="Semi-Precious"/>}
/>


            <Route
              path="/faq"
              element={<FaqPage />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <WhatsAppButton />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
