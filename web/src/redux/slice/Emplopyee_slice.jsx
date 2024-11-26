// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  singleEmployee: [],
  loading: false,
  error: null,
  access: [],
  allEmployee: [],
};

export const getAlEmployee = createAsyncThunk(
  "getAlEmployee",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`employees/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createEmployee = createAsyncThunk(
  "createEmployee",
  async (newEmployee, thunkAPI) => {
    try {
      const res = await axiosInstance.post("employees", newEmployee);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getEmployeebyid = createAsyncThunk(
  "getEmployeebyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`employees/getbyid/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`employees/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async (P_id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`employees/${P_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const Emplopyee_slice = createSlice({
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
      .addCase(getAlEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmployee = action.payload;
      })
      .addCase(getAlEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEmployeebyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeebyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleEmployee = action.payload;
      })
      .addCase(getEmployeebyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Emplopyee_slice.reducer;
export const { searchClient, acessModle } = Emplopyee_slice.actions;
