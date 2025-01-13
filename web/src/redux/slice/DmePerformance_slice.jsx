// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allDmePerformanceData: [],  
  loading: false,
  error: null,
  access: [],
  singleDmePerfromance: [],
};

export const getAllDmePerformance = createAsyncThunk(
  "getAllDmePerformance",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/preformance`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createDmePerformance = createAsyncThunk(
  "createDmePerformance",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("dme/preformance", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getDmePerformancebyid = createAsyncThunk(
  "getDmePerformancebyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/preformance/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateDmePerformance = createAsyncThunk(
  "updateDmePerformance",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`dme/preformance/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteDmePerformance = createAsyncThunk(
  "deleteDmePerformance",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`dme/preformance/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const DmePerformance_slice = createSlice({
  name: "DmePerformance_slice",
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
      .addCase(getAllDmePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDmePerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.allDmePerformanceData = action.payload;
      })
      .addCase(getAllDmePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDmePerformancebyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDmePerformancebyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDmePerfromance = action.payload;
      })
      .addCase(getDmePerformancebyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDmePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDmePerformance.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDmePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDmePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDmePerformance.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDmePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDmePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDmePerformance.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDmePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default DmePerformance_slice.reducer;
export const { searchClient, acessModle } = DmePerformance_slice.actions;
