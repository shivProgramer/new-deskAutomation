// GetDashboardBlock
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";
const initialState = {
  loading: false,
  error: null,
  alldashboardData: [],
};

export const getallDashboard = createAsyncThunk(
  "getallDashboard",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dashboard`);
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
      .addCase(getallDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.alldashboardData = action.payload;
      })
      .addCase(getallDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Dashboard_slice.reducer;
export const { searchClient, acessModle } = Dashboard_slice.actions;
