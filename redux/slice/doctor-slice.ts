import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { axiosInstance } from "@/lib/api";
import { Endpoints } from "@/lib/endpoints";
import { TCreateDoctorSchemaPayload } from "@/schema/doctor";
import { IDepartment, IDoctor, IDoctorPaginationResponse } from "@/type";

type CreateDoctorResponse = {
  status: boolean;
  message: string;
  department: IDepartment;
};

export const createDoctor = createAsyncThunk<
  CreateDoctorResponse,
  TCreateDoctorSchemaPayload,
  { rejectValue: string }
>("admin/doctor/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<CreateDoctorResponse>(
      Endpoints.doctor.create,
      payload,
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to create doctor",
    );
  }
});

export const listOfDoctor = createAsyncThunk<
  IDoctorPaginationResponse,
  { page: number; limit: number },
  { rejectValue: string }
>("admin/doctor/list", async (payload, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<IDoctorPaginationResponse>(
      "/admin/doctor/list",
      {
        params: {
          page: payload.page,
          limit: payload.limit,
        },
      },
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctor list",
    );
  }
});

export const detailsOfDoctor = createAsyncThunk<
  IDoctor,
  string,
  { rejectValue: string }
>("admin/doctor/details", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<IDoctor>(Endpoints.doctor.details(id));

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctor details",
    );
  }
});

interface IDoctorState {
  loading: boolean;
  totalPages: number;
  totalItems: number;
  list: IDoctor[];
  selectedDoctor: IDoctor | null;
  error: string | null;
}

const initialState: IDoctorState = {
  loading: false,
  list: [],
  selectedDoctor: null,
  error: null,
  totalPages: 0,
  totalItems: 0,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create doctor";
      })

      .addCase(listOfDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(listOfDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(listOfDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch doctor list";
      })

      .addCase(detailsOfDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(detailsOfDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDoctor = action.payload;
      })
      .addCase(detailsOfDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch doctor details";
      });
  },
});

export default doctorSlice.reducer;
