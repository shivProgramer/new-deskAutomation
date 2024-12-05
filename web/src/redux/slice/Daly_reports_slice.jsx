// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";


const initialState = {
  singleReport: [],
  loading: false,
  error: null,
  access: [],
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

export const createDalyReports = createAsyncThunk(
 "createDalyReports",
  async (newdata, thunkAPI) => {
    try {
      const res = await axiosInstance.post("daly-reports", newdata);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getDalyReportById = createAsyncThunk(
  "getDalyReportById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`daly-reports/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateDalyReports = createAsyncThunk(
  "updateDalyReports",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`daly-reports/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteDalyReports = createAsyncThunk(
  "deleteDalyReports",
  async (d_id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`daly-reports/${d_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Daly_reports_slice = createSlice({
  name: "Project_cost_slice",
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
      .addCase(getDalyReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDalyReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleReport = action.payload;
      })
      .addCase(getDalyReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDalyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDalyReports.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDalyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDalyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDalyReports.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDalyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDalyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDalyReports.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDalyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Daly_reports_slice.reducer;
export const { searchClient, acessModle } = Daly_reports_slice.actions;
