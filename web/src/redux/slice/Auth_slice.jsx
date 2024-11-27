import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, showToast } from "../../utils/config";
const initialState = {
  isLoggedIn: false,
  token: null,
  loading: false,
  error: null,
};

export const loginApi = createAsyncThunk(
  "loginApi",
  async ({ newData, navigate }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}admin-users/login`, newData);

      // Check if statusCode is not 1
      if (response.data.statusCode !== 1) {
        showToast(response.data.message || "Login failed", "error");
        return thunkAPI.rejectWithValue({
          error: response.data.message || "An unknown error occurred",
        });
      }

      if (response.data.statusCode === 1) {
        const { token, userData } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userData", JSON.stringify(userData));

        navigate("/");

        showToast(response.data.message, "success");

        return { token, userData };
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "An error occurred. Please try again.";
      showToast(errorMsg, "error");
      return thunkAPI.rejectWithValue({ error: errorMsg });
    }
  }
);



export const Registerapi = createAsyncThunk(
  "Registerapi",
  async (newData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}admin-users/register`, newData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



const Auth_slice = createSlice({
  name: "Auth_slice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(Registerapi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Registerapi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(Registerapi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout } = Auth_slice.actions;

export default Auth_slice.reducer;
