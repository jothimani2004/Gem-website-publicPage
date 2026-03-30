import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchShapes = createAsyncThunk("shapes/fetchShapes", async () => {
  const response = await api.get("/public/shape_types");
  console.log(response.data.data);
  return response.data.data.map((shape) => ({
    id: shape.shape_id,
    name: shape.shape_name,
    slug: shape.shape_name.toLowerCase(),
  }));
});


const shapeSlice = createSlice({
  name: "shapes",
  initialState: {
    items: [],
    status: "idle",
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
      });
  },
});

export default shapeSlice.reducer;
