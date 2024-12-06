// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";
import { showToast } from "../../utils/config";

const initialState = {
  singleProduct: [],
  loading: false,
  error: null,
  access: [],
  allAdhocReport: [],
  Spdata: [],
};

export const getAllAdhocReport = createAsyncThunk(
  "getAllAdhocReport",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`adhoc-reports`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const CreateAdhocReport = createAsyncThunk(
  "CreateAdhocReport",
  async (newData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("adhoc-reports",newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getSpData = createAsyncThunk(
  "getSpData",
  async (name, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/adhoc-reports/execute/${name}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Adhoc_Report_slice = createSlice({
  name: "Project_cost_slice",
  initialState,
  reducers: {
    searchClient: (state, action) => {
      state.searchData = action.payload;
    },
    clearSpddata: (state, action) => {
      state.Spdata = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdhocReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdhocReport.fulfilled, (state, action) => {
        state.loading = false;
        state.allAdhocReport = action.payload;
      })
      .addCase(getAllAdhocReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSpData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpData.fulfilled, (state, action) => {
        state.loading = false;
        state.Spdata = action.payload;
      })
      .addCase(getSpData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CreateAdhocReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateAdhocReport.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CreateAdhocReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("reset", () => initialState);
  },
});

export default Adhoc_Report_slice.reducer;
export const { searchClient, clearSpddata } = Adhoc_Report_slice.actions;
