// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  allProjectTasksEmployeeData: [],
  loading: false,
  error: null,
  access: [],
  singleProjectTasksEmployee: [],
};

export const getAllProjectTasksEmployee = createAsyncThunk(
  "getAllProjectTasksEmployee",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`task-employee`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createProjectTasksEmployee = createAsyncThunk(
  "createProjectTasksEmployee",
  async (newData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("task-employee", newData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getProjectTasksEmployeebyid = createAsyncThunk(
  "getProjectTasksEmployeebyid",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`task-employee/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateProjectTasksEmployee = createAsyncThunk(
  "updateProjectTasksEmployee",
  async ({ id, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`task-employee/${id}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteProjectTasksEmployee = createAsyncThunk(
  "deleteProjectTasksEmployee",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`task-employee/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const ProjectTasksEmployee_slice = createSlice({
  name: "ProjectTasksEmployee_slice",
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
      .addCase(getAllProjectTasksEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjectTasksEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjectTasksEmployeeData = action.payload;
      })
      .addCase(getAllProjectTasksEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProjectTasksEmployeebyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectTasksEmployeebyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProjectTasksEmployee = action.payload;
      })
      .addCase(getProjectTasksEmployeebyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProjectTasksEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectTasksEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProjectTasksEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProjectTasksEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProjectTasksEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createProjectTasksEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProjectTasksEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProjectTasksEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProjectTasksEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("reset", () => initialState);
  },
});

export default ProjectTasksEmployee_slice.reducer;
export const { searchClient, acessModle } = ProjectTasksEmployee_slice.actions;
