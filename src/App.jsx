import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import GemListing from "./pages/GemListing/GemListing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/semiprecious/spinel" element={<GemListing />} />
          </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
