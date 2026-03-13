import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// 🔥 Async fetch (mock backend with real pagination logic)
export const fetchGems = createAsyncThunk(
  "gems/fetchGems",
  async (params, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const {
        page = 1,
        limit = 6,
        shape,
        color,
        maxCarat
      } = params;

      // 🔹 Simulated full database (50 gems)
      const allGems = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: i % 2 === 0 ? "Blue Spinel" : "Red Spinel",
        lotNumber: `SP-${100 + i}`,
        shape: i % 2 === 0 ? "oval" : "round",
        color: i % 2 === 0 ? "blue" : "red",
        carat: Number((Math.random() * 5 + 1).toFixed(2)),
        image: "/images/spinel1.jpg",
      }));

      // 🔹 Apply filters (simulate backend filtering)
      let filtered = allGems;

      if (shape) {
        filtered = filtered.filter((g) => g.shape === shape);
      }

      if (color) {
        filtered = filtered.filter((g) => g.color === color);
      }

      if (maxCarat) {
        filtered = filtered.filter((g) => g.carat <= maxCarat);
      }

      const total = filtered.length;

      // 🔹 Pagination logic
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedItems = filtered.slice(startIndex, endIndex);

      return {
        items: paginatedItems,
        total,
        page,
        limit,
      };

    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch gems");
    }
  }
);


const gemSlice = createSlice({
  name: "gems",
  initialState: {
    items: [],
    total: 0,
    page: 1,
    limit: 6,
    filters: {},
    status: "idle",
    error: null,
  },
  reducers: {
  setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.filters = action.meta.arg;
      })
      .addCase(fetchGems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPage } = gemSlice.actions;
export default gemSlice.reducer;
