import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  const response = await api.get("/public/color_types");
  const colorMap = {
    "red": { hex: "#DC2626", name: "Red" },
    "blue": { hex: "#1D4ED8", name: "Blue" },
    "green": { hex: "#15803D", name: "Green" },
    "yellow": { hex: "#F59E0B", name: "Yellow" },
    "purple": { hex: "#7C3AED", name: "Purple" },
    "pink": { hex: "#EC4899", name: "Pink" },
    "black": { hex: "#111827", name: "Black" },
    "white": { hex: "#FFFFFF", name: "White (Colorless)" },
    "grey": { hex: "#6B7280", name: "Grey" },
    "cyan": { hex: "#06B6D4", name: "Cyan (Light Blue)" },
    "magenta": { hex: "#D946EF", name: "Magenta" },
    "ocean blue": { hex: "#0284C7", name: "Teal (Ocean Blue)" },
    "orange pink": { hex: "#FB923C", name: "Peach (Orange Pink)" },
    "golden yellow": { hex: "#EAB308", name: "Amber (Golden Yellow)" }
  };
  return response.data.data.map((color) => {
    const normName = color.color_name.toLowerCase().trim();
    const mapped = colorMap[normName] || { hex: normName, name: color.color_name };
    return {
      id: color.color_id,
      name: mapped.name,
      slug: color.color_name.toLowerCase(),
      hex: mapped.hex,
    };
  });
});

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      });
  },
});

export default colorSlice.reducer;
