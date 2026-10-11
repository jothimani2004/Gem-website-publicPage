import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchShapes = createAsyncThunk(
  "shapes/fetchShapes",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/public/shape_types");
      const list = response.data?.data || [];
      return list.map((shape) => ({
        id: shape.shape_id,
        name: shape.shape_name,
        slug: (shape.shape_name || "").toLowerCase(),
      }));
    } catch (error) {
      console.error("Failed to fetch shapes:", error);
      return thunkAPI.rejectWithValue("Failed to fetch shapes");
    }
  }
);


const shapeSlice = createSlice({
  name: "shapes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShapes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShapes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchShapes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.items = [];
      });
  },
});

export default shapeSlice.reducer;
