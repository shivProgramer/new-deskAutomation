// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allDmeRewardData: [],
  loading: false,
  error: null,
  access: [],
  singleDmeReward: [],  
};

export const getAllDmeReward = createAsyncThunk( 
  "getAllDmeReward",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/reward-rules`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createDmeReward = createAsyncThunk(
  "createDmeReward",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("dme/reward-rules", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getDmeRewardbyid = createAsyncThunk(
  "getDmeRewardbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/reward-rules/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateDmeReward = createAsyncThunk(
  "updateDmeReward",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`dme/reward-rules/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteDmeReward = createAsyncThunk(
  "deleteDmeReward",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`dme/reward-rules/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Dme_Reward_slice = createSlice({
  name: "DmeReward_slice",
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
      .addCase(getAllDmeReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDmeReward.fulfilled, (state, action) => {
        state.loading = false;
        state.allDmeRewardData = action.payload;
      })
      .addCase(getAllDmeReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDmeRewardbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDmeRewardbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDmeReward = action.payload;
      })
      .addCase(getDmeRewardbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDmeReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDmeReward.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDmeReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDmeReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDmeReward.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDmeReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDmeReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDmeReward.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDmeReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Dme_Reward_slice.reducer;
export const { searchClient, acessModle } = Dme_Reward_slice.actions;
