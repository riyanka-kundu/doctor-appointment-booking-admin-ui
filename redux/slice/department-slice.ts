import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { axiosInstance } from "@/lib/api";
import { Endpoints } from "@/lib/endpoints";
import { TDepartmentPayload } from "@/schema/department";
import { IApiResponse, IDepartment } from "@/type";

type CreateDepartmentResponse = {
  status: boolean;
  message: string;
  department: IDepartment;
};
type DeleteDepartmentResponse = {
  status: boolean;
  message: string;
  id: string;
};

export const createDepartment = createAsyncThunk<
  CreateDepartmentResponse,
  TDepartmentPayload,
  { rejectValue: string }
>("admin/doctor/department", async (payload, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<CreateDepartmentResponse>(
      Endpoints.department.create,
      payload,
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to create department",
    );
  }
});

export const listOfDepartment = createAsyncThunk<
  IApiResponse["IDepartmentApiResponse"],
  void,
  { rejectValue: string }
>("admin/departments/list", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<IApiResponse["IDepartmentApiResponse"]>(
      Endpoints.department.list,
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to retrieve department",
    );
  }
});
export const deleteDepartment = createAsyncThunk<
  DeleteDepartmentResponse,
  string,
  { rejectValue: string }
>("admin/departments/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<DeleteDepartmentResponse>(
      Endpoints.department.delete,
      { id },
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to remove department",
    );
  }
});

interface IDepartmentState {
  loading: boolean;
  list: IDepartment[];
  error: string | null;
}

const initialState: IDepartmentState = {
  loading: false,
  list: [],
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create department";
      })

      .addCase(listOfDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listOfDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(listOfDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to retrieve department";
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.payload.id;

        state.list = state.list.filter((dept) => dept._id !== deletedId);
      })

      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Delete failed";
      });
  },
});

export default departmentSlice.reducer;
