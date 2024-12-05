// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";

const initialState = {
  loading: false,
  error: null,
  access: [],
  allCommPList: [],
};

export const getAllEcomm_project_List = createAsyncThunk(
  "getAllEcomm_project_List",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`ecomm-p-list`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateStatusEcomm = createAsyncThunk(
  "updateStatusEcomm",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`ecomm-p-list/status/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const sendReportInReporting= createAsyncThunk(
  "sendReportInReporting",
   async (newdata, thunkAPI) => {
     try {
       const res = await axiosInstance.post("ecomm-p-list/send-report", newdata);
       return res.data;
     } catch (error) {
       return thunkAPI.rejectWithValue({ error: error.message });
     }
   }
 );
 

const E_comm_p_List_slice = createSlice({
  name: "E_comm_p_List_slice",
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
      .addCase(getAllEcomm_project_List.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEcomm_project_List.fulfilled, (state, action) => {
        state.loading = false;
        state.allCommPList = action.payload;
      })
      .addCase(getAllEcomm_project_List.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStatusEcomm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatusEcomm.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateStatusEcomm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendReportInReporting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendReportInReporting.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendReportInReporting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("reset", () => initialState);
  },
});

export default E_comm_p_List_slice.reducer;
export const { searchClient, acessModle } = E_comm_p_List_slice.actions;
