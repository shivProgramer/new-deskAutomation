// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/axiosInstance";
import { showToast } from "../../utils/config";

const initialState = {
  marketer: [],
  allProduct: [],
  marketerAnalytics: [],
  loading: false,
  error: null,
  access: [],
  allProjects: [],
};
// Fetch product data

export const getAllProjects = createAsyncThunk(
  "getAllProjects",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`projects`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateMarketerProfilePic = createAsyncThunk(
  "updateMarketerProfilePic",
  async ({ marketerId, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `marketers/upload/marketer-profile/${marketerId}`,
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.statusCode === 1) {
        response.data.statusCode &&
          showToast({ msg: response.data.message }, "success");
      } else {
        response.data.statusCode &&
          showToast({ msg: response.data.message }, "error");
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateMarketer = createAsyncThunk(
  "updateMarketer",
  async ({ markterId, newData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `marketers/${markterId}`,
        newData
      );

      if (response.data.statusCode === 1) {
        response.data.statusCode &&
          showToast({ msg: response.data.message }, "success");
      } else {
        response.data.statusCode &&
          showToast({ msg: response.data.message }, "error");
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const trackImpression = createAsyncThunk(
  "trackImpression",
  async ({ productId, vendorId, marketerId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `affiliate/track/impression?productId=${productId}&vendorId=${vendorId}&marketerId=${marketerId}`
      );

      if (response.status === 1) {
        showToast({ msg: "Impression tracked successfully." }, "success");
      }

      return response.data;
    } catch (error) {
      showToast({ msg: "Failed to track impression." }, "error");
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

const Project_cost_slice = createSlice({
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
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMarketerProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMarketerProfilePic.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMarketerProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMarketer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMarketer.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMarketer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(trackImpression.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackImpression.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(trackImpression.rejected, (state, action) => {
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

export default Project_cost_slice.reducer;
export const { searchClient, acessModle } = Project_cost_slice.actions;
