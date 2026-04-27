import { useEffect, useState } from "react";
import Hero from "../../Components/Hero/Hero";
import GemCategory from "../../Components/gem/GemCategory/GemCategory";
import api from "../../services/api";
import TrustBanner from "../../Components/banner/TrustBanner";
import styles from "./Home.module.css";
import AboutSection from "../../Components/aboutus/AboutSection";
import Testimonials from "../../Components/Testimonials/Testimonials";  
import FaqPage from "../Faq/FaqPage";
import { Link } from "react-router-dom";

function Home() {
  const [preciousGems, setPreciousGems] = useState([]);
  const [semiPreciousGems, setSemiPreciousGems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const response = await api.get("/public/get_gem_types");
        if (response.data && response.data.result && response.data.result.gems) {
          const allDivisions = response.data.result.gems;
          
          const precious = allDivisions.find((div) => div.division.toLowerCase() === "precious");
          const semiPrecious = allDivisions.find((div) => div.division.toLowerCase() === "semiprecious" || div.division.toLowerCase() === "semi-precious");

          if (precious && precious.gems) {
             setPreciousGems(precious.gems);
          }
          if (semiPrecious && semiPrecious.gems) {
             setSemiPreciousGems(semiPrecious.gems);
          }
        }
      } catch (error) {
        console.error("Failed to fetch gem categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGems();
  }, []);

  return (
    <>
      <Hero />
       <AboutSection />
      <TrustBanner />
     
      <section className={styles.sectionHeading}>
        <h1>Our Exquisite Gemstone Collections</h1>
        <p>Premium, certified gemstones — crafted by nature, curated for you.</p>
      </section>
      

      {loading ? (
         <div style={{textAlign: "center", padding: "50px"}}>Loading categories...</div>
      ) : (
         <>
          <GemCategory 
             title="Precious Gemstones" 
             gems={preciousGems.slice(0, 4).map(g => ({...g, name: g.gemName, image: `https://d1wugj5ru4kx2.cloudfront.net/${g.image}`}))} 
             category="Precious" 
          />
          <GemCategory 
             title="Semi-Precious Gemstones" 
             gems={semiPreciousGems.slice(0, 4).map(g => ({...g, name: g.gemName, image: `https://d1wugj5ru4kx2.cloudfront.net/${g.image}`}))} 
             category="Semi-Precious" 
          />
         </>
      )}
      <Testimonials />
      <FaqPage />
    </>
  );
}

export default Home;
