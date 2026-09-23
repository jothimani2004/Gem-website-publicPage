import styles from "./Gemgrid.module.css";
import { useSelector } from "react-redux";
import GemCard from "../GemCard/GemCard";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader/Loader";

function Gemgrid({category}){

  const {gemName}=useParams();
 

    const { items = [], status, error } = useSelector(
        (state) => state.gems || {}
    );
      
      
    
      if (status === "loading" && items.length === 0) {
        return <Loader text="Loading Collection..." fullScreen={false} />;
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
        <div className={styles.grid} style={{ opacity: status === "loading" ? 0.5 : 1, transition: "opacity 0.2s" }}>
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