import { useState } from "react";
import Shapefilter from "../ShapeFilter/Shapefilter";
import Typefilter from "../TypeFilter/Typefilter";
import Colorfilter from "../ColorFilter/Colorfilter";
import Applyresetbutton from "../ApplyResetButtons/Applyresetbutton";
import Weightfilter from "../WeightFilter/Weightfilter";

function Filtersidebar() {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedType, setSelectedType] = useState("single");
  const [selectedColor, setSelectedColor] = useState("");
  const [carat, setCarat] = useState(10);





  const handleReset = () => {
    setSelectedShape("");
    setSelectedColor("");
    setSelectedType("single");
    setCarat(10);
  };
  const handleApply = () => {
    
  };

  return (
    <div>

        <Typefilter
            value={selectedType}
            onChange={setSelectedType}
        />

        {selectedType=="single" && (
            <>

            <Shapefilter
                value={selectedShape}
                onChange={(value)=>setSelectedShape(value)}
                
            />

            <Colorfilter
            value={selectedColor}
            onChange={setSelectedColor}
            />

            </>
        )}

        <Weightfilter
        value={carat}
        onChange={setCarat}
        />

        <Applyresetbutton
        onApply={handleApply}
        onReset={handleReset}
        />


    </div>
  );
}

export default Filtersidebar;
