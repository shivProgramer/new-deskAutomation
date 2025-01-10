// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  singleSalesReward: [],
  loading: false,
  error: null,
  access: [],
  allSalesRewardData: [],
};

export const getAllSalesReward = createAsyncThunk(
  "getAllSalesReward",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`sales_rewards`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createSalesReward = createAsyncThunk(
  "createSalesReward",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("sales_rewards", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getSalesRewardbyid = createAsyncThunk(
  "getSalesRewardbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`sales_rewards/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateSalesReward = createAsyncThunk(
  "updateSalesReward",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`sales_rewards/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteSalesReward = createAsyncThunk(
  "deleteSalesReward",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`sales_rewards/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const SalesReward_slice = createSlice({
  name: "SalesReward_slice",
  initialState,
  reducers: {
    searchClient: (state, action) => {
      state.searchData = action.payload;
    },
    acessModle: (state, action) => {
      state.access = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalesReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSalesReward.fulfilled, (state, action) => {
        state.loading = false;
        state.allSalesRewardData = action.payload;
      })
      .addCase(getAllSalesReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSalesRewardbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesRewardbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSalesReward = action.payload;
      })
      .addCase(getSalesRewardbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSalesReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSalesReward.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSalesReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createSalesReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSalesReward.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createSalesReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSalesReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSalesReward.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSalesReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default SalesReward_slice.reducer;
export const { searchClient, acessModle } = SalesReward_slice.actions;
