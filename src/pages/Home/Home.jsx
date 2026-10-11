import { useEffect, useState } from "react";
import Hero from "../../Components/Hero/Hero";
import GemCategory from "../../Components/gem/GemCategory/GemCategory";
import api from "../../services/api";
import TrustBanner from "../../Components/banner/TrustBanner";
import styles from "./Home.module.css";
import AboutSection from "../../Components/aboutus/AboutSection";
import Testimonials from "../../Components/Testimonials/Testimonials";  
import FaqPage from "../Faq/FaqPage";
import SEO from "../../Components/common/SEO/SEO";
import { CLOUDFRONT_URL } from "../../utils/constants";

function Home() {
  const [preciousGems, setPreciousGems] = useState([]);
  const [semiPreciousGems, setSemiPreciousGems] = useState([]);
  const [loading, setLoading] = useState(true);

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://aimplussgems.com/#organization",
        "name": "Aimpluss Gems",
        "url": "https://aimplussgems.com",
        "logo": `${CLOUDFRONT_URL}/logo.png`,
        "description": "Supplier of high quality, natural earth-mined loose gemstones based in Bangkok, Thailand since 2004.",
        "foundingDate": "2004",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangkok",
          "addressCountry": "Thailand"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://aimplussgems.com/#website",
        "url": "https://aimplussgems.com",
        "name": "Aimpluss Gems",
        "publisher": {
          "@id": "https://aimplussgems.com/#organization"
        }
      }
    ]
  };

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const response = await api.get("/public/get_gem_types");
        if (response.data && response.data.result && response.data.result.gems) {
          const allDivisions = response.data.result.gems;
          
          const cleanDiv = (name) => (name || "").toLowerCase().replace(/[\s-_]/g, "");
          const precious = allDivisions.find((div) => cleanDiv(div.division) === "precious");
          const semiPrecious = allDivisions.find((div) => cleanDiv(div.division) === "semiprecious");

          if (precious && Array.isArray(precious.gems)) {
             setPreciousGems(precious.gems);
          }
          if (semiPrecious && Array.isArray(semiPrecious.gems)) {
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
      <SEO
        title="Aimpluss Gems — Premium Certified Loose Gemstones"
        description="Discover natural earth-mined precious and semi-precious loose gemstones, certified Sapphires, Rubies & Emeralds curated in Bangkok & Sri Lanka since 2004."
        keywords="natural gemstones, certified loose gems, blue sapphire, unheated gemstones, bangkok gem trade, ruby, emerald, aimpluss gems"
        canonical="https://aimplussgems.com/"
        schema={homeSchema}
      />
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
             gems={preciousGems.slice(0, 8).map(g => ({...g, name: g.gemName, image: `${CLOUDFRONT_URL}/${g.image}`}))} 
             category="Precious" 
          />
          <GemCategory 
             title="Semi-Precious Gemstones" 
             gems={semiPreciousGems.slice(0, 8).map(g => ({...g, name: g.gemName, image: `${CLOUDFRONT_URL}/${g.image}`}))} 
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
