import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { axiosInstance } from "@/lib/api";
import { Endpoints } from "@/lib/endpoints";
import { TLoginPayload } from "@/schema/auth";
import { IApiResponse } from "@/type";
import { Cookies } from "react-cookie";

export const login = createAsyncThunk(
  "auth/login",
  async (payload: TLoginPayload, { rejectWithValue }) => {
    const cookies = new Cookies();
    try {
      const res = await axiosInstance.post<IApiResponse["Login"]>(
        Endpoints.auth.login,
        payload,
      );
      const token = res.data.accessToken;
      const refresh = res.data.refreshToken;

      cookies.set("token", token, {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      cookies.set("refresh", refresh, {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);
export const logout = createAsyncThunk(
  "admin/logout",

  async (_, { rejectWithValue }) => {
    const cookies = new Cookies();
    try {
      const res = await axiosInstance.post(Endpoints.auth.logout);

      cookies.remove("token", {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      cookies.remove("refresh", {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  },
);

interface IAuthState {
  loading: boolean;
  data: IApiResponse["Login"] | null;
  error: string | null;
}

const initialState: IAuthState = {
  loading: false,
  data: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = (action.payload as string) || "Login failed";
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Logout failed";
      });
  },
});

export default authSlice.reducer;
