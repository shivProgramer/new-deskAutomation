// GetDashboardBlock

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";
const initialState = {
  loading: false,
  error: null,
  allDalyReports: [],
};

export const getAllDalyReports = createAsyncThunk(
  "getAllDalyReports",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`daly-reports`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Dashboard_slice = createSlice({
  name: "Dashboard_slice",
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
      .addCase(getAllDalyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDalyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.allDalyReports = action.payload;
      })
      .addCase(getAllDalyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Dashboard_slice.reducer;
export const { searchClient, acessModle } = Dashboard_slice.actions;
