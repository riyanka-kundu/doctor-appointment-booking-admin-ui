"use client";

import { ArrowLeft, Clock, IndianRupee, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Skeleton } from "@/components/ui/skeleton";
import { detailsOfDoctor } from "@/redux/slice/doctor-slice";
import { AppDispatch, RootState } from "@/redux/store/store";

const DoctorDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.id as string;

  const { selectedDoctor, loading } = useSelector(
    (state: RootState) => state.doctor,
  );

  useEffect(() => {
    dispatch(detailsOfDoctor(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-xl mx-auto space-y-4">
        <Skeleton className="h-6 w-32 rounded-xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (!selectedDoctor) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No doctor found
          </p>
        </div>
      </div>
    );
  }

  const initials = selectedDoctor.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950 p-6 md:p-8">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back to Doctors
        </Link>

        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="p-6 flex flex-col items-center border-b border-slate-200 dark:border-slate-800 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {initials}
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              {selectedDoctor.name}
            </h1>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
              <Stethoscope size={14} />
              {selectedDoctor.department?.name ?? "General"}
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Consultation Fees
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1">
                  <IndianRupee size={16} className="text-slate-400" />
                  {selectedDoctor.fees}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Slot Duration
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1">
                  <Clock size={16} className="text-slate-400" />
                  {selectedDoctor.schedule?.slotDuration} mins
                </p>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Daily Availability
              </h2>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Shift Starts
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedDoctor.schedule?.startTime}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Shift Ends
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedDoctor.schedule?.endTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
