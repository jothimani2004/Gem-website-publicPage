import styles from "./MoreGems.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GemCategory from "../../Components/gem/GemCategory/GemCategory";
import api from "../../services/api";
import Loader from "../../Components/common/Loader/Loader";
import SEO from "../../Components/common/SEO/SEO";
import { CLOUDFRONT_URL } from "../../utils/constants";

function MoreGems ({category}){
    const [preciousGems, setPreciousGems] = useState([]);
    const [semiPreciousGems, setSemiPreciousGems] = useState([]);
    const [loading, setLoading] = useState(true);

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
const isPrecious = category?.toLowerCase() === "precious";

const gemsToShow = isPrecious ? preciousGems : semiPreciousGems;

const pageTitle = isPrecious
  ? "Precious Gemstones Collection | Certified Natural Gems"
  : "Semi-Precious Gemstones Collection | Natural Fine Gems";

const pageDescription = isPrecious
  ? "Explore our curated collection of certified natural precious gemstones including Sapphires, Rubies & Emeralds from Bangkok & Sri Lanka."
  : "Browse our premium selection of natural semi-precious loose gemstones. Certified authentic, earth-mined stones for custom jewellery.";

const collectionSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": `https://aimplussgems.com/${category}`
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aimplussgems.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category,
          "item": `https://aimplussgems.com/${category}`
        }
      ]
    }
  ]
};

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={`natural ${category} gemstones, loose ${category} stones, certified gems, bangkok gemstone market, aimpluss gems`}
        canonical={`https://aimplussgems.com/${category}`}
        schema={collectionSchema}
      />

        {/* 💎 BEAUTIFUL BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <span className={styles.separator}>›</span>
          <span className={styles.current}>{category}</span>
        </div>



    <div className={styles.contentWrapper}>
      {loading ? (
        <Loader text="Retrieving Gem Specifications" fullScreen={true} />
      ) : (
        <GemCategory
          title={isPrecious ? "Precious Gemstones" : "Semi-Precious Gemstones"}
          gems={gemsToShow.map((g) => ({
            ...g,
            name: g.gemName,
            image: `${CLOUDFRONT_URL}/${g.image}`,
          }))}
          category={category}
          showExplore={false}
        />
      )}
    </div>


    </>
  );

}


export default MoreGems;