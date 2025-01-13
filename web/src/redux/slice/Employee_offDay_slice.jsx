// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allEmployeeoffdaysData: [],
  loading: false,
  error: null,
  access: [],
  singleEmployeeoffdays: [],
};

export const getAllEmployeeoffdays = createAsyncThunk(
  "getAllEmployeeoffdays",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`employee-offdays`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createEmployeeoffdays = createAsyncThunk(
  "createEmployeeoffdays",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("employee-offdays", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getEmployeeoffdaysbyid = createAsyncThunk(
  "getEmployeeoffdaysbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`employee-offdays/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateEmployeeoffdays = createAsyncThunk(
  "updateEmployeeoffdays",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`employee-offdays/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteEmployeeoffdays = createAsyncThunk(
  "deleteEmployeeoffdays",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`employee-offdays/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Employee_offDay_slice = createSlice({
  name: "Employee_offDay_slice",
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
      .addCase(getAllEmployeeoffdays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployeeoffdays.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmployeeoffdaysData = action.payload;
      })
      .addCase(getAllEmployeeoffdays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEmployeeoffdaysbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeoffdaysbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleEmployeeoffdays = action.payload;
      })
      .addCase(getEmployeeoffdaysbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateEmployeeoffdays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeoffdays.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEmployeeoffdays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createEmployeeoffdays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployeeoffdays.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createEmployeeoffdays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployeeoffdays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeoffdays.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEmployeeoffdays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Employee_offDay_slice.reducer;
export const { searchClient, acessModle } = Employee_offDay_slice.actions;
