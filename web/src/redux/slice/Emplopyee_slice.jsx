// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {

  singleProduct: [],
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

export const createPorject = createAsyncThunk(
  "createProject",
  async (newproject, thunkAPI) => {
    try {
      const res = await axiosInstance.post("projects", newproject);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getprojectbyid = createAsyncThunk(
  "getprojectbyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`projects/getByid/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateProjects = createAsyncThunk(
  "updateProjects",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`projects/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteProjects = createAsyncThunk(
  "deleteProjects",
  async (P_id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`projects/${P_id}`);
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
      .addCase(getprojectbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getprojectbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getprojectbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjects.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPorject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPorject.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPorject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProjects.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default Emplopyee_slice.reducer;
export const { searchClient, acessModle } = Emplopyee_slice.actions;
