import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GemCard from "../GemCard/GemCard";
import styles from "./RelatedGems.module.css";
import api from "../../../services/api";

function RelatedGems({ category }) {
  const { gemName, id } = useParams();
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

        // 2. Fetch a larger pool of gems to randomize from
        const categoryId = category?.toLowerCase() === "mixed" ? 2 : 1; 
        const url = `/public/gem_List/${gem_id}/${categoryId}?page=1&limit=30`;
        const dataRes = await api.get(url);
        
        let items = dataRes.data?.data || [];
        
        // Filter out current active gem first
        const currentIdStr = String(id);
        items = items.filter(item => String(item.each_gem_id) !== currentIdStr);

        // Shuffle the items array (Fisher-Yates)
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        // 3. Map and pick the top 4 random items
        const selectedItems = items.slice(0, 4);

        const mappedItems = selectedItems.map(item => ({
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

        setRelatedGems(mappedItems);
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
        <div className={styles.headerText}>
          <h3 className={styles.title}>You May Also Like</h3>
          <p className={styles.subtitle}>Discover hand-picked gems similar to this {gemName}</p>
        </div>
        <button
          className={styles.moreBtn}
          onClick={handleMoreClick}
        >
          Explore All {gemName}s <i className="fa-solid fa-arrow-right" style={{marginLeft: "8px"}}></i>
        </button>
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
    </div>
  );
}

export default RelatedGems;
