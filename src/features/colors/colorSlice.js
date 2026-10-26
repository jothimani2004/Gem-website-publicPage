import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const colorMap = {
  // Direct matches for all backend color types
  "blue": { hex: "#1D4ED8", name: "Blue" },
  "red": { hex: "#DC2626", name: "Red" },
  "green": { hex: "#15803D", name: "Green" },
  "pink": { hex: "#EC4899", name: "Pink" },
  "yellow": { hex: "#F59E0B", name: "Yellow" },
  "teal": { hex: "#0D9488", name: "Teal" },
  "peach": { hex: "#FB923C", name: "Peach" },
  "purple": { hex: "#7C3AED", name: "Purple" },
  "orange": { hex: "#EA580C", name: "Orange" },
  "white": { hex: "#FFFFFF", name: "White" },
  "black": { hex: "#111827", name: "Black" },
  "multi-color": {
    hex: "linear-gradient(135deg, #EF4444 0%, #F59E0B 25%, #10B981 50%, #3B82F6 75%, #8B5CF6 100%)",
    name: "Multi-color",
  },
  "multicolor": {
    hex: "linear-gradient(135deg, #EF4444 0%, #F59E0B 25%, #10B981 50%, #3B82F6 75%, #8B5CF6 100%)",
    name: "Multi-color",
  },
  "multi color": {
    hex: "linear-gradient(135deg, #EF4444 0%, #F59E0B 25%, #10B981 50%, #3B82F6 75%, #8B5CF6 100%)",
    name: "Multi-color",
  },
  "neon blue": { hex: "#00E5FF", name: "Neon Blue" },
  "violet": { hex: "#6366F1", name: "Violet" },

  // Additional gem color variations
  "bi-color": {
    hex: "linear-gradient(135deg, #2563EB 50%, #F59E0B 50%)",
    name: "Bi-Color",
  },
  "bi color": {
    hex: "linear-gradient(135deg, #2563EB 50%, #F59E0B 50%)",
    name: "Bi-Color",
  },
  "color change": {
    hex: "linear-gradient(135deg, #059669 50%, #7C3AED 50%)",
    name: "Color Change",
  },
  "grey": { hex: "#6B7280", name: "Grey" },
  "gray": { hex: "#6B7280", name: "Grey" },
  "cyan": { hex: "#06B6D4", name: "Cyan" },
  "magenta": { hex: "#D946EF", name: "Magenta" },
  "ocean blue": { hex: "#0284C7", name: "Ocean Blue" },
  "orange pink": { hex: "#FB923C", name: "Orange Pink" },
  "golden yellow": { hex: "#EAB308", name: "Golden Yellow" },
  "brown": { hex: "#92400E", name: "Brown" },
  "lavender": { hex: "#A855F7", name: "Lavender" },
  "padparadscha": { hex: "#FB7185", name: "Padparadscha" },
};

const resolveColorHex = (rawName) => {
  const norm = (rawName || "").toLowerCase().trim();
  if (colorMap[norm]) return colorMap[norm].hex;

  if (norm.includes("multi")) return colorMap["multi-color"].hex;
  if (norm.includes("bi")) return colorMap["bi-color"].hex;
  if (norm.includes("change")) return colorMap["color change"].hex;

  for (const [key, value] of Object.entries(colorMap)) {
    if (norm.includes(key)) return value.hex;
  }

  return "#94A3B8";
};

export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/public/color_types");
      const list = response.data?.data || [];
      return list.map((color) => {
        const hex = resolveColorHex(color.color_name);
        return {
          id: color.color_id,
          name: color.color_name,
          slug: (color.color_name || "").toLowerCase(),
          hex,
        };
      });
    } catch (error) {
      console.error("Failed to fetch colors:", error);
      return thunkAPI.rejectWithValue("Failed to fetch colors");
    }
  }
);

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    items: [],
    status: "idle",
    error: null,
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
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.items = [];
      });
  },
});

export default colorSlice.reducer;
