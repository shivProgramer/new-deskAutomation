// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allDmeTeamData: [],
  loading: false,
  error: null,
  access: [],
  singleDmeTeam: [],
};

export const getAllDmeTeam = createAsyncThunk(
  "getAllDmeTeam",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/teams`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createDmeTeam = createAsyncThunk(
  "createDmeTeam",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("dme/teams", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getDmeTeambyid = createAsyncThunk(
  "getDmeTeambyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dme/teams/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateDmeTeam = createAsyncThunk(
  "updateDmeTeam",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`dme/teams/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteDmeTeam = createAsyncThunk(
  "deleteDmeTeam",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`dme/teams/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Dme_Team_slice = createSlice({
  name: "Dme_Team_slice",
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
      .addCase(getAllDmeTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDmeTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.allDmeTeamData = action.payload;
      })
      .addCase(getAllDmeTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDmeTeambyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDmeTeambyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDmeTeam = action.payload;
      })
      .addCase(getDmeTeambyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDmeTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDmeTeam.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDmeTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDmeTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDmeTeam.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDmeTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDmeTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDmeTeam.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDmeTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Dme_Team_slice.reducer;
export const { searchClient, acessModle } = Dme_Team_slice.actions;
