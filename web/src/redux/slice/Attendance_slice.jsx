// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
 singleAttendance: [],
  loading: false,
  error: null,
  access: [],
  allAttendance: [],
};

export const getAllAttendance = createAsyncThunk(
  "getAllAttendance",
  async ( thunkAPI) => {
    try {
      const response = await axiosInstance.get(`attendance`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createAttendance = createAsyncThunk(
  "createAttendance",
  async (newdata, thunkAPI) => {
    try {
      const res = await axiosInstance.post("attendance", newdata);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


export const getAttendancebyid = createAsyncThunk(
  "getAttendancebyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`attendance/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateAttendance = createAsyncThunk(
  "updateAttendance",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`attendance/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteAttendance = createAsyncThunk(
  "deleteAttendance",
  async (a_id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`attendance/${a_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Attendance_slice = createSlice({
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
      .addCase(getAllAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.allAttendance = action.payload;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAttendancebyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendancebyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleAttendance = action.payload;
      })
      .addCase(getAttendancebyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Attendance_slice.reducer;
export const { searchClient, acessModle } = Attendance_slice.actions;
