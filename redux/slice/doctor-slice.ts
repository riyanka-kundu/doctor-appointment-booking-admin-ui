import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { axiosInstance } from "@/lib/api";
import { Endpoints } from "@/lib/endpoints";
import { TCreateDoctorSchemaPayload, UpdateDoctorInput } from "@/schema/doctor";
import {
  IApiDataResponse,
  IDepartment,
  IDoctor,
  IDoctorPaginationResponse,
} from "@/type";

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
    const res = await axiosInstance.get<IApiDataResponse<IDoctor>>(
      Endpoints.doctor.details(id),
    );
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctor details",
    );
  }
});

export const updateDoctor = createAsyncThunk<
  IDoctor,
  { id: string; payload: UpdateDoctorInput },
  { rejectValue: string }
>("admin/doctor/update", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<IApiDataResponse<IDoctor>>(
      Endpoints.doctor.update,
      { ...payload, id },
    );
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to update doctor",
    );
  }
});
export const deleteDoctor = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/doctor/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<{ id: string }>(
      Endpoints.doctor.delete,
      { id },
    );

    return res.data.id; // return deleted id
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to remove doctor",
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
      })
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;

        // update list
        state.list = state.list.map((doc) =>
          doc._id === action.payload._id ? action.payload : doc,
        );

        // update selected doctor if open
        if (state.selectedDoctor?._id === action.payload._id) {
          state.selectedDoctor = action.payload;
        }
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update doctor";
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;

        state.list = state.list.filter((doc) => doc._id !== action.payload);
        if (state.selectedDoctor?._id === action.payload) {
          state.selectedDoctor = null;
        }
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete doctor";
      });
  },
});

export default doctorSlice.reducer;
