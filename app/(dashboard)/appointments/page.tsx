import AppointmentList from "@/components/appointments/appointment-list";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="size-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    }>
      <AppointmentList />
    </Suspense>
  );
};

export default page;
