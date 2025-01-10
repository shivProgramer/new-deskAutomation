// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allDmeAnalysisData: [],
  loading: false,
  error: null,
  access: [],
  singleDmeAnalysis: [],
};

export const getAllDmeAnalysis = createAsyncThunk(
  "getAllDmeAnalysis",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/analysis`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createDmeAnalysis = createAsyncThunk(
  "createDmeAnalysis",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("dme/analysis", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getDmeAnalysisbyid = createAsyncThunk(
  "getDmeAnalysisbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/analysis/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateDmeAnalysis = createAsyncThunk(
  "updateDmeAnalysis",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`dme/analysis/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteDmeAnalysis = createAsyncThunk(
  "deleteDmeAnalysis",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`dme/analysis/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const DmeAnalysis_slice = createSlice({
  name: "DmeAnalysis_slice",
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
      .addCase(getAllDmeAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDmeAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.allDmeAnalysisData = action.payload;
      })
      .addCase(getAllDmeAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDmeAnalysisbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDmeAnalysisbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDmeAnalysis = action.payload;
      })
      .addCase(getDmeAnalysisbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDmeAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDmeAnalysis.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDmeAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDmeAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDmeAnalysis.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDmeAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDmeAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDmeAnalysis.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDmeAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default DmeAnalysis_slice.reducer;
export const { searchClient, acessModle } = DmeAnalysis_slice.actions;
