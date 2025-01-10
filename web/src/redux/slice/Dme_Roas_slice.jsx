// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allDmeRoasData: [],
  loading: false,
  error: null,
  access: [],
  singleDmeRoas: [],
};

export const getAllDmeRoas = createAsyncThunk(
  "getAllDmeRoas",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/roas`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createDmeRoas = createAsyncThunk(
  "createDmeRoas",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("dme/roas", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getDmeRoasbyid = createAsyncThunk(
  "getDmeRoasbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/roas/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateDmeRoas = createAsyncThunk(
  "updateDmeRoas",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`dme/roas/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteDmeRoas = createAsyncThunk(
  "deleteDmeRoas",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`dme/roas/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Dme_Roas_slice = createSlice({
  name: "Dme_Roas_slice",
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
      .addCase(getAllDmeRoas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDmeRoas.fulfilled, (state, action) => {
        state.loading = false;
        state.allDmeRoasData = action.payload;
      })
      .addCase(getAllDmeRoas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDmeRoasbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDmeRoasbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDmeRoas = action.payload;
      })
      .addCase(getDmeRoasbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDmeRoas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDmeRoas.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDmeRoas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDmeRoas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDmeRoas.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDmeRoas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDmeRoas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDmeRoas.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDmeRoas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Dme_Roas_slice.reducer;
export const { searchClient, acessModle } = Dme_Roas_slice.actions;
