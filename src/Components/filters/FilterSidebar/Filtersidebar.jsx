import { useState, useEffect } from "react";
import Shapefilter from "../ShapeFilter/Shapefilter";
import Typefilter from "../TypeFilter/Typefilter";
import Colorfilter from "../ColorFilter/Colorfilter";
import Weightfilter from "../WeightFilter/Weightfilter";
import Applyresetbutton from "../ApplyResetButtons/Applyresetbutton";
import styles from "./Filtersidebar.module.css";

function Filtersidebar({ onApply, appliedFilters }) {
  const [selectedShape, setSelectedShape] = useState(appliedFilters?.shape || "");
  const [selectedType, setSelectedType] = useState(appliedFilters?.type || "single");
  const [selectedColor, setSelectedColor] = useState(appliedFilters?.color || "");
  const [carat, setCarat] = useState(appliedFilters?.maxCarat || "");

  const [activeFilters, setActiveFilters] = useState({
    shape: !!appliedFilters?.shape,
    color: !!appliedFilters?.color,
    carat: !!appliedFilters?.maxCarat
  });

  useEffect(() => {
    setSelectedShape(appliedFilters?.shape || "");
    setSelectedType(appliedFilters?.type || "single");
    setSelectedColor(appliedFilters?.color || "");
    setCarat(appliedFilters?.maxCarat || "");
    setActiveFilters({
      shape: !!appliedFilters?.shape,
      color: !!appliedFilters?.color,
      carat: !!appliedFilters?.maxCarat
    });
  }, [appliedFilters]);

  const getFiltersPayload = () => {
    return {
      type: selectedType,
      shape: selectedType === "single" && activeFilters.shape ? selectedShape : "",
      color: selectedType === "single" && activeFilters.color ? selectedColor : "",
      maxCarat: activeFilters.carat ? carat : "",
    };
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    if (onApply) {
      onApply({
        type: newType,
        shape: newType === "single" && activeFilters.shape ? selectedShape : "",
        color: newType === "single" && activeFilters.color ? selectedColor : "",
        maxCarat: activeFilters.carat ? carat : "",
      });
    }
  };

  const handleShapeChange = (value) => {
    setSelectedShape(value);
  };

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  const handleCaratChange = (value) => {
    setCarat(value);
  };

  const toggleFilter = (filterName) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleApplyClick = () => {
    if (onApply) {
      onApply(getFiltersPayload());
    }
  };

  const handleResetClick = () => {
    setSelectedShape("");
    setSelectedType("single");
    setSelectedColor("");
    setCarat("");
    setActiveFilters({
      shape: false,
      color: false,
      carat: false
    });
    if (onApply) {
      onApply({
        type: "single",
        shape: "",
        color: "",
        maxCarat: ""
      });
    }
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

      <Applyresetbutton
        onApply={handleApplyClick}
        onReset={handleResetClick}
      />
    </div>
  );
}

export default Filtersidebar;
