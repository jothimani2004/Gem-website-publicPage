import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  const response = await api.get("/public/color_types");
  // The API just exposes names like "Red", "Blue".
  // CSS natively supports these as background colors, so we map hex directly to the lowercase name!
  return response.data.data.map((color) => ({
    id: color.color_id,
    name: color.color_name,
    slug: color.color_name.toLowerCase(),
    hex: color.color_name.toLowerCase(),
  }));
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
