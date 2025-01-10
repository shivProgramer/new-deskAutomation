// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allSalesTeamTargetVal: [],
  loading: false,
  error: null,
  access: [],
  singleSalesTeamsTarget: [],
};

export const getAllSalesTeamTarget = createAsyncThunk(
  "getAllSalesTeamTarget",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`sales-targets`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createSalesTeamsTargetVal = createAsyncThunk(
  "createSalesTeamsTargetVal",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("sales-targets", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getSalesTeamsTargetByid = createAsyncThunk(
  "getSalesTeamsTargetByid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`sales-targets/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateSalesTeamsTarget = createAsyncThunk(
  "updateSalesTeamsTarget",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`sales-targets/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteSalesTeamsTarget = createAsyncThunk(
  "deleteSalesTeamsTarget",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`sales-targets/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const SalesTeamTarget_slice = createSlice({
  name: "SalesTeamTarget_slice",
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
      .addCase(getAllSalesTeamTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSalesTeamTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.allSalesTeamTargetVal= action.payload;
      })
      .addCase(getAllSalesTeamTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSalesTeamsTargetByid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesTeamsTargetByid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSalesTeamsTarget = action.payload;
      })
      .addCase(getSalesTeamsTargetByid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSalesTeamsTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSalesTeamsTarget.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSalesTeamsTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createSalesTeamsTargetVal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSalesTeamsTargetVal.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createSalesTeamsTargetVal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSalesTeamsTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSalesTeamsTarget.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSalesTeamsTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default SalesTeamTarget_slice.reducer;
export const { searchClient, acessModle } = SalesTeamTarget_slice.actions;
