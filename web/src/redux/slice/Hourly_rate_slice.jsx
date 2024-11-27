// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";


const initialState = {
  singleHoruly: [],
  loading: false,
  error: null,
  access: [],
  allEmpHoruly: [],
};

export const getAllEmployeHourly = createAsyncThunk(
  "getAllEmployeHourly",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`employee-hourly-rate`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createHourlyRate = createAsyncThunk(
 "createHourlyRate",
  async (newdata, thunkAPI) => {
    try {
      const res = await axiosInstance.post("employee-hourly-rate", newdata);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getHourlyRateByid = createAsyncThunk(
  "getHourlyRateByid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`employee-hourly-rate/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateHorulyRate = createAsyncThunk(
  "updateHorulyRate",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`employee-hourly-rate/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteHourlyRate = createAsyncThunk(
  "deleteHourlyRate",
  async (hr_id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`employee-hourly-rate/${hr_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Hourly_rate_slice = createSlice({
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
      .addCase(getAllEmployeHourly.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployeHourly.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmpHoruly = action.payload;
      })
      .addCase(getAllEmployeHourly.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getHourlyRateByid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHourlyRateByid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleHoruly = action.payload;
      })
      .addCase(getHourlyRateByid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateHorulyRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHorulyRate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateHorulyRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createHourlyRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHourlyRate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createHourlyRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteHourlyRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHourlyRate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteHourlyRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Hourly_rate_slice.reducer;
export const { searchClient, acessModle } = Hourly_rate_slice.actions;
