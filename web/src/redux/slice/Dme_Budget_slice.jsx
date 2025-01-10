// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allDmeBudgetData: [],
  loading: false,
  error: null,
  access: [],
  singleDmeBudget: [],
};

export const getAllDmeBudget = createAsyncThunk(
  "getAllDmeBudget",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/budgets`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createDmeBudget = createAsyncThunk(
  "createDmeBudget",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("dme/budgets", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getDmeBudgetbyid = createAsyncThunk(
  "getDmeBudgetbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/budgets/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateDmeBudget = createAsyncThunk(
  "updateDmeBudget",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`dme/budgets/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteDmeBudget = createAsyncThunk(
  "deleteDmeBudget",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`dme/budgets/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Dme_Budget_slice = createSlice({
  name: "Dme_Budget_slice",
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
      .addCase(getAllDmeBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDmeBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.allDmeBudgetData = action.payload;
      })
      .addCase(getAllDmeBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDmeBudgetbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDmeBudgetbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDmeBudget = action.payload;
      })
      .addCase(getDmeBudgetbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDmeBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDmeBudget.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDmeBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDmeBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDmeBudget.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDmeBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDmeBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDmeBudget.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDmeBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Dme_Budget_slice.reducer;
export const { searchClient, acessModle } = Dme_Budget_slice.actions;
