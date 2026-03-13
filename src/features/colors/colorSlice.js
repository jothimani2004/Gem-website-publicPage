import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: 1, name: "Red", slug: "red", hex: "#dc2626" },
    { id: 2, name: "Blue", slug: "blue", hex: "#2563eb" },
    { id: 3, name: "Green", slug: "green", hex: "#16a34a" },
    { id: 4, name: "Yellow", slug: "yellow", hex: "#facc15" },
    { id: 5, name: "Purple", slug: "purple", hex: "#9333ea" },
    { id: 6, name: "Pink", slug: "pink", hex: "#ec4899" },
  ],
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
});

export default colorSlice.reducer;
