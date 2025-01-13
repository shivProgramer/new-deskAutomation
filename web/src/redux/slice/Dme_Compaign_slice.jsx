// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allDmeCompaignData: [],
  loading: false,
  error: null,
  access: [],
  singleDmeCompaign: [],
};

export const getAllDmeCompaign = createAsyncThunk(
  "getAllDmeCompaign",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/compaign`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createDmeCompaign = createAsyncThunk(
  "createDmeCompaign",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("dme/compaign", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getDmeCompaignbyid = createAsyncThunk(
  "getDmeCompaignbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/compaign/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateDmeCompaign = createAsyncThunk(
  "updateDmeCompaign",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`dme/compaign/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteDmeCompaign = createAsyncThunk(
  "deleteDmeCompaign",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`dme/compaign/${id}`);
      if (response.data.status === 0) {
        return thunkAPI.rejectWithValue({
          status: response.data.status,
          error: response.data.error,
          message: response.data.message,
        });
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue({
          status: error.response.status,
          error: error.response.data.error || "Request failed",
          message: error.response.data.message || "An error occurred",
        });
      } else {
        return thunkAPI.rejectWithValue({
          status: 500,
          error: error.message,
          message: "An unexpected error occurred",
        });
      }
    }
  }
);

const Dme_Compaign_slice = createSlice({
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
      .addCase(getAllDmeCompaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDmeCompaign.fulfilled, (state, action) => {
        state.loading = false;
        state.allDmeCompaignData = action.payload;
      })
      .addCase(getAllDmeCompaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDmeCompaignbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDmeCompaignbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDmeCompaign = action.payload;
      })
      .addCase(getDmeCompaignbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDmeCompaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDmeCompaign.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDmeCompaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDmeCompaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDmeCompaign.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDmeCompaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDmeCompaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDmeCompaign.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDmeCompaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Dme_Compaign_slice.reducer;
export const { searchClient, acessModle } = Dme_Compaign_slice.actions;
