import { useParams, useNavigate } from "react-router-dom";
import GemCard from "../GemCard/GemCard";
import styles from "./RelatedGems.module.css";

function RelatedGems() {
  const { category, gemName } = useParams();
  const navigate = useNavigate();

  const relatedGems = [
    {
      id: 101,
      name: "Blue Spinel",
      lotNumber: "SP-201",
      shape: "Oval",
      carat: 3.2,
      color: "Blue",
      image: "/images/spinel1.jpg",
    },
    {
      id: 102,
      name: "Red Spinel",
      lotNumber: "SP-202",
      shape: "Round",
      carat: 2.1,
      color: "Red",
      image: "/images/spinel2.jpg",
    },
    {
      id: 103,
      name: "Pink Spinel",
      lotNumber: "SP-203",
      shape: "Cushion",
      carat: 4.5,
      color: "Pink",
      image: "/images/spinel3.jpg",
    },
    {
      id: 104,
      name: "Purple Spinel",
      lotNumber: "SP-204",
      shape: "Pear",
      carat: 5.1,
      color: "Purple",
      image: "/images/spinel4.jpg",
    },
  ];

  const visibleGems = relatedGems.slice(0, 4);

  const handleMoreClick = () => {
    navigate(`/${category}/${gemName}`);
  };

  return (
    <div className={styles.wrapper}>

      <h3 className={styles.title}>Related Gems</h3>

      <div className={styles.grid}>
        {visibleGems.map((gem) => (
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

      {/* Button BELOW cards */}
      <div className={styles.moreContainer}>
        <button
          className={styles.moreBtn}
          onClick={handleMoreClick}
        >
          View More →
        </button>
      </div>

    </div>
  );
}

export default RelatedGems;
