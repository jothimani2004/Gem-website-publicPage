import round from "../../../assets/shape-icons/round.svg";
import oval from "../../../assets/shape-icons/oval.svg";
import pear from "../../../assets/shape-icons/pear.svg";
import emerald from "../../../assets/shape-icons/emerald.svg";
import radiant from "../../../assets/shape-icons/radiant.svg";
import heart from "../../../assets/shape-icons/heart.svg";
import marquise from "../../../assets/shape-icons/marquise.svg";
import square from "../../../assets/shape-icons/square.svg";
import trillion from "../../../assets/shape-icons/trillion.svg";
import cushion from "../../../assets/shape-icons/cushion.svg";
import princess from "../../../assets/shape-icons/princess.svg";
import baguette from "../../../assets/shape-icons/baguette.svg";
import cabochon from "../../../assets/shape-icons/cabochon.svg";
import fancyCut from "../../../assets/shape-icons/fancy-cut.svg";
import defaultIcon from "../../../assets/shape-icons/default.svg";

import octagon from "../../../assets/shape-icons/octagon.svg";
import cube from "../../../assets/shape-icons/cube.svg";
import cylinder from "../../../assets/shape-icons/cylinder.svg";
import triangle from "../../../assets/shape-icons/triangle.svg";
import cone from "../../../assets/shape-icons/cone.svg";
import sphere from "../../../assets/shape-icons/sphere.svg";

import styles from "./ShapeIcon.module.css";

const iconMap = {
  // Primary gem shapes
  round,
  oval,
  pear,
  emerald,
  "emerald cut": emerald,
  "emeraldcut": emerald,
  radiant,
  "radiant cut": radiant,
  cushion,
  "cushion cut": cushion,
  heart,
  "heart shape": heart,
  marquise,
  square,
  trillion,
  "trillion cut": trillion,
  princess,
  "princess cut": princess,
  baguette,
  "baguette cut": baguette,
  cabochon,
  "fancy cut": fancyCut,
  "fancycut": fancyCut,
  "fancy": fancyCut,

  // Additional 3D / geometric shapes
  octagon,
  cube,
  cylinder,
  triangle,
  cone,
  sphere,
};

const resolveIcon = (slug) => {
  if (!slug) return defaultIcon;
  const clean = slug.toLowerCase().trim();

  // 1. Direct match
  if (iconMap[clean]) return iconMap[clean];

  // 2. Normalized without whitespace or hyphens
  const normalized = clean.replace(/[\s-_]/g, "");
  if (iconMap[normalized]) return iconMap[normalized];

  // 3. Keyword matching
  if (normalized.includes("emerald")) return emerald;
  if (normalized.includes("cushion")) return cushion;
  if (normalized.includes("princess")) return princess;
  if (normalized.includes("radiant")) return radiant;
  if (normalized.includes("baguette")) return baguette;
  if (normalized.includes("cabochon")) return cabochon;
  if (normalized.includes("fancy")) return fancyCut;
  if (normalized.includes("trillion") || normalized.includes("trilliant")) return trillion;
  if (normalized.includes("marquise")) return marquise;
  if (normalized.includes("heart")) return heart;
  if (normalized.includes("round")) return round;
  if (normalized.includes("oval")) return oval;
  if (normalized.includes("pear")) return pear;
  if (normalized.includes("square") || normalized.includes("asscher")) return square;
  if (normalized.includes("octagon")) return octagon;
  if (normalized.includes("triangle")) return triangle;

  return defaultIcon;
};

function ShapeIcon({ slug }) {
  const icon = resolveIcon(slug);

  return (
    <img
      src={icon}
      alt={slug || "gemstone shape"}
      width="32"
      height="32"
      className={styles.iconImg}
      loading="lazy"
    />
  );
}

export default ShapeIcon;
