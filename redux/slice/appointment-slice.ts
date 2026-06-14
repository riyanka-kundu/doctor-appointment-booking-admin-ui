import { axiosInstance } from "@/lib/api";
import { Endpoints } from "@/lib/endpoints";
import {
  IApiDataResponse,
  IAppointment,
  IAppointmentListResponse,
} from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const listOfAppointments = createAsyncThunk<
  IAppointmentListResponse,
  void,
  { rejectValue: string }
>("admin/appointment/list", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<IAppointmentListResponse>(
      Endpoints.appointment.list,
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to retrieve appointment list",
    );
  }
});

export const cancelAppointment = createAsyncThunk<
  IAppointment,
  string,
  { rejectValue: string }
>("admin/appointment/cancel", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put<IApiDataResponse<IAppointment>>(
      Endpoints.appointment.cancel(id),
    );
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to cancel appointment",
    );
  }
});

export const confirmAppointment = createAsyncThunk<
  IAppointment,
  string,
  { rejectValue: string }
>("admin/appointment/confirm", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put<IApiDataResponse<IAppointment>>(
      Endpoints.appointment.confirm(id),
    );
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to confirm appointment",
    );
  }
});
export const accepctlistOfAppointment = createAsyncThunk<
  IAppointment[],
  void,
  { rejectValue: string }
>("admin/appointment/accept-list", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<IApiDataResponse<IAppointment[]>>(
      Endpoints.appointment.accepctlist,
    );
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to retrieve accept list",
    );
  }
});

interface IAppointmentState {
  loading: boolean;
  list: IAppointment[];
  acceptList: IAppointment[];
  selectedAppointment: IAppointment | null;
  error: string | null;
}

const initialState: IAppointmentState = {
  loading: false,
  list: [],
  acceptList: [],
  selectedAppointment: null,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listOfAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listOfAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(listOfAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to retrieve appointments";
      })

      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((apt) =>
          apt._id === action.payload._id ? action.payload : apt,
        );
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to cancel appointment";
      })

      .addCase(confirmAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((apt) =>
          apt._id === action.payload._id ? action.payload : apt,
        );
      })
      .addCase(confirmAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to confirm appointment";
      })
      .addCase(accepctlistOfAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(accepctlistOfAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.acceptList = action.payload;
      })
      .addCase(accepctlistOfAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to confirm appointment";
      });
  },
});

export default appointmentSlice.reducer;
