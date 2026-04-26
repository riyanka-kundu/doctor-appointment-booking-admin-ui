import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/redux/slice/auth-slice";
import departmentSlice from "@/redux/slice/department-slice";
import doctorSlice from "@/redux/slice/doctor-slice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    department: departmentSlice,
    doctor: doctorSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
