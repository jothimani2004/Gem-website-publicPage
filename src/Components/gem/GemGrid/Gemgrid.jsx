import styles from "./Gemgrid.module.css";
import { useSelector } from "react-redux";
import GemCard from "../GemCard/GemCard";
import { useParams } from "react-router-dom";

function Gemgrid(){

  const {category,gemName}=useParams();
  console.log(gemName);
 

    const { items = [], status, error } = useSelector(
        (state) => state.gems || {}
      );
    
      if (status === "loading") {
        return (
          <div className={styles.center}>
            Loading gems...
          </div>
        );
      }
    
      if (status === "failed") {
        return (
          <div className={styles.center}>
            {error || "Something went wrong."}
          </div>
        );
      }
    
      if (!items.length) {
        return (
          <div className={styles.center}>
            No gems found for selected filters.
          </div>
        );
      }
    
      return (
        <div className={styles.grid}>
          {items.map((gem) => (
            <GemCard
              key={gem.id}
              gem={{
                ...gem,
                link: `/${category}/${gemName}/${gem.id}`,
              }}
              variant="listing"
            />
          ))}
        </div>
    )

}

export default Gemgrid;