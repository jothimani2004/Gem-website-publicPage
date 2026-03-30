import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchGems = createAsyncThunk(
  "gems/fetchGems",
  async (params, thunkAPI) => {
    try {
      const {
        category, // Frontend URL string "Precious" / "Semi-Precious"
        gemName,  // Frontend URL string "Ruby", etc.
        page = 1,
        limit = 6,
        shape,
        color,
        maxCarat,
        type
      } = params;
      
      const categoryId = type === "mixed" ? 2 : 1;

      // 1. Get Gem ID mapping
      const gemsRes = await api.get("/public/get_gem_types");
      let gem_id = null;
      if (gemsRes.data?.result?.gems) {
         for (const div of gemsRes.data.result.gems) {
            const found = div.gems.find(g => g.gemName.toLowerCase() === (gemName || "").toLowerCase());
            if (found) {
               gem_id = found.gemId || found.gem_id || found.id || found.each_gem_id; // Check based on actual id prop
               // fallback to common prop names
               if (!gem_id && found.gemId !== undefined) gem_id = found.gemId;
            }
         }
      }
      
      if (!gem_id) {
         throw new Error("Gem type not found");
      }

      // 2. Gather filter parameters
      let activeFilters = [];
      let queryParams = new URLSearchParams({ page, limit });

      if (color) {
         // Map color name to color_id if needed, but if backend accepts id, 
         // we might need to fetch color_types. Let's assume we map it or pass it.
         // Wait, the API specifies filter=color_id&value=2
         const colorRes = await api.get("/public/color_types");
         const colorMatch = colorRes.data?.data?.find(c => c.color_name.toLowerCase() === color.toLowerCase());
         if (colorMatch) {
            activeFilters.push({ key: "color_id", value: colorMatch.color_id });
            queryParams.append("color_id", colorMatch.color_id); // For 3-filter
         }
      }

      if (shape) {
         const shapeRes = await api.get("/public/shape_types");
         const shapeMatch = shapeRes.data?.data?.find(s => s.shape_name.toLowerCase() === shape.toLowerCase());
         if (shapeMatch) {
            activeFilters.push({ key: "shape_id", value: shapeMatch.shape_id });
            queryParams.append("shape_id", shapeMatch.shape_id);
         }
      }

      if (maxCarat) {
         activeFilters.push({ key: "crt", value: maxCarat });
         queryParams.append("crt", maxCarat);
      }

      // 3. Determine endpoint
      let url = "";

      const catParam = categoryId === 1 ? "category_1" : "category_2";
      
      if (activeFilters.length === 0) {
         url = `/public/gem_List/${gem_id}/${categoryId}?page=${page}&limit=${limit}`;
      } else if (activeFilters.length === 1) {
         url = `/public/single_filter_gem/${gem_id}/${categoryId}?page=${page}&limit=${limit}&filter=${activeFilters[0].key}&value=${activeFilters[0].value}`;
      } else if (activeFilters.length === 2) {
         url = `/public/double_filter_gem/${gem_id}/${catParam}/${activeFilters[0].key}/${activeFilters[1].key}?page=${page}&limit=${limit}&value1=${activeFilters[0].value}&value2=${activeFilters[1].value}`;
      } else {
         url = `/public/three_filter_gem/${gem_id}/${catParam}?${queryParams.toString()}`;
      }

      // 4. Fetch the data
      const dataRes = await api.get(url);
   
      
      const items = dataRes.data?.data || [];
   console.log(items);
      
      // We will map the backend keys to the frontend expectations.
      // Frontend expects: id, name, lotNumber, shape, color, carat, image.
      const mappedItems = items.map(item => ({
         id: item.each_gem_id,
         name: gemName,
         lotNumber: item.lot_number,
         shape: item.shape_name,
         color: item.color_name,
         carat: item.crt,
         image: item.thumbnail ? `https://d1wugj5ru4kx2.cloudfront.net/${item.thumbnail}` : 
                (item.images && item.images.length > 0) ? `https://d1wugj5ru4kx2.cloudfront.net/${item.image}` : 
                null
      }));

      // In a real app we'd fetch the filter count route too if total pagination is needed.
      // E.g. /public/single_filter_count/..
      // For now, let's assume total is mostly unknown or provided in response (it's not, it's a separate API).
      // Let's set total to a high enough number so pagination works locally if not explicitly given.
      
      return {
        items: mappedItems,
        total: mappedItems.length < limit ? (page - 1) * limit + mappedItems.length : page * limit + limit, // Fake total so "Next" pagination appears active if full page.
        page,
        limit,
      };

    } catch (error) {
      console.error(error);
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
