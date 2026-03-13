import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: 1, name: "Round", slug: "round" },
    { id: 2, name: "Oval", slug: "oval" },
    { id: 3, name: "Pear", slug: "pear" },
    { id: 4, name: "Emerald", slug: "emerald" },
    { id: 5, name: "Radiant", slug: "radiant" },
    { id: 6, name: "Heart", slug: "heart" },
    { id: 7, name: "Marquise", slug: "marquise" },
    { id: 8, name: "Square", slug: "square" },
    { id: 9, name: "Trillion", slug: "trillion" },
    { id: 10, name: "Cushion", slug: "cushion" },
    { id: 11, name: "Princess", slug: "princess" },

  ],
};

const shapeSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {},
});

export default shapeSlice.reducer;
