import { configureStore } from "@reduxjs/toolkit";
import shapeReducer from "../features/shapes/shapeSlice";
import colorReducer from "../features/colors/colorSlice"
import gemReducer from "../features/gems/gemSlice";

const store = configureStore({
  reducer: {
    shapes: shapeReducer,
    colors: colorReducer,
    gems: gemReducer,

  },
});

export default store;
