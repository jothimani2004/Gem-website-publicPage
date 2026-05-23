import { useState } from "react";
import Shapefilter from "../ShapeFilter/Shapefilter";
import Typefilter from "../TypeFilter/Typefilter";
import Colorfilter from "../ColorFilter/Colorfilter";
import Weightfilter from "../WeightFilter/Weightfilter";
import styles from "./Filtersidebar.module.css";

function Filtersidebar({ onApply }) {
  const [selectedShape, setSelectedShape] = useState("");
  const [selectedType, setSelectedType] = useState("single");
  const [selectedColor, setSelectedColor] = useState("");
  const [carat, setCarat] = useState("");

  const [activeFilters, setActiveFilters] = useState({
    shape: false,
    color: false,
    carat: false
  });

  const getFiltersPayload = (typeOverride = null, shapeOverride = null, colorOverride = null, caratOverride = null, activeOverride = null) => {
    const type = typeOverride ?? selectedType;
    const active = activeOverride ?? activeFilters;
    const shapeVal = shapeOverride ?? selectedShape;
    const colorVal = colorOverride ?? selectedColor;
    const caratVal = caratOverride ?? carat;

    return {
      type,
      shape: type === "single" && active.shape ? shapeVal : "",
      color: type === "single" && active.color ? colorVal : "",
      maxCarat: active.carat ? caratVal : "",
    };
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    if (onApply) {
      onApply(getFiltersPayload(newType));
    }
  };

  const handleShapeChange = (value) => {
    setSelectedShape(value);
    if (onApply) {
      onApply(getFiltersPayload(null, value));
    }
  };

  const handleColorChange = (value) => {
    setSelectedColor(value);
    if (onApply) {
      onApply(getFiltersPayload(null, null, value));
    }
  };

  const handleCaratChange = (value) => {
    setCarat(value);
    if (onApply) {
      onApply(getFiltersPayload(null, null, null, value));
    }
  };

  const toggleFilter = (filterName) => {
    setActiveFilters((prev) => {
      const newActiveFilters = { ...prev, [filterName]: !prev[filterName] };
      if (onApply) {
        onApply(getFiltersPayload(null, null, null, null, newActiveFilters));
      }
      return newActiveFilters;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h3 className={styles.sidebarTitle}>Filters</h3>
      </div>

      <Typefilter
        value={selectedType}
        onChange={handleTypeChange}
      />

      {selectedType === "single" && (
        <>
          <Shapefilter
            value={selectedShape}
            onChange={handleShapeChange}
            isActive={activeFilters.shape}
            onToggle={() => toggleFilter("shape")}
          />

          <Colorfilter
            value={selectedColor}
            onChange={handleColorChange}
            isActive={activeFilters.color}
            onToggle={() => toggleFilter("color")}
          />
        </>
      )}

      <Weightfilter
        value={carat}
        onChange={handleCaratChange}
        isActive={activeFilters.carat}
        onToggle={() => toggleFilter("carat")}
      />
    </div>
  );
}

export default Filtersidebar;
