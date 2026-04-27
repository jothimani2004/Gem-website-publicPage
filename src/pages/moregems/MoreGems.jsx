import styles from "./MoreGems.module.css";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import GemCategory from "../../Components/gem/GemCategory/GemCategory";
import api from "../../services/api";
import Loader from "../../Components/common/Loader/Loader";

function MoreGems (){
    const {category} = useParams();
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
const isPrecious = category?.toLowerCase() === "precious";

const gemsToShow = isPrecious ? preciousGems : semiPreciousGems;

const title = isPrecious
  ? "Precious Gemstones"
  : "Semi-Precious Gemstones";

  return (
    <>

        {/* 💎 BEAUTIFUL BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <span className={styles.separator}>›</span>
          <span className={styles.current}>{category}</span>
        </div>



   <div>
      {loading ? (
        <Loader text="Retrieving Gem Specifications" fullScreen={true} />
      ) : (
        <GemCategory
          title={title}
          gems={gemsToShow.map((g) => ({
            ...g,
            name: g.gemName,
            image: `https://d1wugj5ru4kx2.cloudfront.net/${g.image}`,
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