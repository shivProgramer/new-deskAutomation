// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  singleSalesTransaction: [],
  loading: false,
  error: null,
  access: [],
  allSalesTransationData: [],
};

export const getAllSalesTransaction = createAsyncThunk(
  "getAllSalesTransaction",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`sales/transaction`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createSalesTransaction = createAsyncThunk(
  "createSalesTransaction",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("sales/transaction", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getSalesTransactionbyid = createAsyncThunk(
  "getSalesTransactionbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`sales/transaction/${id}`);
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

const SalesTransaction_slice = createSlice({
  name: "SalesTransaction_slice",
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
      .addCase(getAllSalesTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSalesTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.allSalesTransationData = action.payload;
      })
      .addCase(getAllSalesTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSalesTransactionbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesTransactionbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSalesTransaction = action.payload;
      })
      .addCase(getSalesTransactionbyid.rejected, (state, action) => {
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

      .addCase(createSalesTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSalesTransaction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createSalesTransaction.rejected, (state, action) => {
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

export default SalesTransaction_slice.reducer;
export const { searchClient, acessModle } = SalesTransaction_slice.actions;
