import round from "../../../assets/shape-icons/round.svg";
import oval from "../../../assets/shape-icons/oval.svg";
import pear from "../../../assets/shape-icons/pear.svg";
import emerald from "../../../assets/shape-icons/emerald.svg";
import radiant from "../../../assets/shape-icons/radiant.svg";
import heart from "../../../assets/shape-icons/heart.svg";
import marquise from "../../../assets/shape-icons/marquise.svg"
import square from "../../../assets/shape-icons/square.svg"
import trillion from "../../../assets/shape-icons/trillion.svg"
import defaultIcon from "../../../assets/shape-icons/default.svg";
import cushion from "../../../assets/shape-icons/cushion.svg";
import princess from "../../../assets/shape-icons/princess.svg";

import octagon from "../../../assets/shape-icons/octagon.svg";
import cube from "../../../assets/shape-icons/cube.svg";
import cylinder from "../../../assets/shape-icons/cylinder.svg";
import triangle from "../../../assets/shape-icons/triangle.svg";
import cone from "../../../assets/shape-icons/cone.svg";
import sphere from "../../../assets/shape-icons/sphere.svg";

import style from "./ShapeIcon.module.css";

const iconMap = {
  round,
  oval,
  pear,
  emerald,
  radiant,
  cushion,
  heart,
  marquise,
  square,
  trillion,
  princess,
  octagon,
  cube,
  cylinder,
  triangle,
  cone,
  sphere
};

function ShapeIcon({ slug }) {
  const icon = iconMap[slug];

  if (!icon) return null;

  return <img src={icon} alt={slug} width="40" height="40"  />;
}

export default ShapeIcon;
