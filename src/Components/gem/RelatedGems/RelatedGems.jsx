import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GemCard from "../GemCard/GemCard";
import styles from "./RelatedGems.module.css";
import api from "../../../services/api";

function RelatedGems() {
  const { category, gemName, id } = useParams();
  const navigate = useNavigate();

  const [relatedGems, setRelatedGems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        // 1. Get Gem ID mapping
        const gemsRes = await api.get("/public/get_gem_types");
        let gem_id = null;
        if (gemsRes.data?.result?.gems) {
           for (const div of gemsRes.data.result.gems) {
              const found = div.gems.find(g => g.gemName.toLowerCase() === (gemName || "").toLowerCase());
              if (found) {
                 gem_id = found.gemId || found.gem_id || found.id || found.each_gem_id;
                 if (!gem_id && found.gemId !== undefined) gem_id = found.gemId;
              }
           }
        }
        
        if (!gem_id) {
            setLoading(false);
            return;
        }

        // 2. Fetch gems list
        const categoryId = category?.toLowerCase() === "mixed" ? 2 : 1; 
        const url = `/public/gem_List/${gem_id}/${categoryId}?page=1&limit=6`;
        const dataRes = await api.get(url);
        
        const items = dataRes.data?.data || [];
        
        // 3. Map and filter
        const mappedItems = items.map(item => ({
           id: item.each_gem_id,
           name: gemName,
           lotNumber: item.lot_number,
           shape: item.shape_name,
           color: item.color_name,
           carat: item.crt,
           image: item.thumbnail ? `https://d1wugj5ru4kx2.cloudfront.net/${item.thumbnail}` : 
                  (item.images && item.images.length > 0) ? `https://d1wugj5ru4kx2.cloudfront.net/${item.images[0].file}` : 
                  null
        }));

        // Filter out current active gem
        const currentIdStr = String(id);
        const filtered = mappedItems.filter(g => String(g.id) !== currentIdStr).slice(0, 4);
        
        setRelatedGems(filtered);
      } catch (error) {
        console.error("Error fetching related gems", error);
      } finally {
        setLoading(false);
      }
    };

    if (gemName) {
       fetchRelated();
    }
  }, [category, gemName, id]);

  const handleMoreClick = () => {
    navigate(`/${category}/${gemName}`);
  };

  if (loading || relatedGems.length === 0) {
    return null; 
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>You May Also Like</h3>
        <p className={styles.subtitle}>Discover hand-picked gems similar to this {gemName}</p>
      </div>

      <div className={styles.grid}>
        {relatedGems.map((gem) => (
          <div key={gem.id} className={styles.cardWrapper}>
            <GemCard
              gem={{
                ...gem,
                link: `/${category}/${gemName}/${gem.id}`,
              }}
              variant="listing"
            />
          </div>
        ))}
      </div>

      <div className={styles.moreContainer}>
        <button
          className={styles.moreBtn}
          onClick={handleMoreClick}
        >
          Explore All {gemName}s
        </button>
      </div>
    </div>
  );
}

export default RelatedGems;
