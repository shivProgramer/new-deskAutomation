// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allHolidaysData: [],
  loading: false,
  error: null,
  access: [],
  singleHolidays: [],
};

export const getAllHolidays = createAsyncThunk(
  "getAllHolidays",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`holidays`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createHolidays = createAsyncThunk(
  "createHolidays",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("holidays", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getHolidaysbyid = createAsyncThunk(
  "getHolidaysbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`holidays/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateHolidays = createAsyncThunk(
  "updateHolidays",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`holidays/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteHolidays = createAsyncThunk(
  "deleteHolidays",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`holidays/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Holidays_slice = createSlice({
  name: "Holidays_slice",
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
      .addCase(getAllHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.allHolidaysData = action.payload;
      })
      .addCase(getAllHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getHolidaysbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHolidaysbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleHolidays = action.payload;
      })
      .addCase(getHolidaysbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHolidays.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHolidays.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHolidays.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Holidays_slice.reducer;
export const { searchClient, acessModle } = Holidays_slice.actions;
