"use client";

import AppointmentActions from "@/components/appointments/appointment-action";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/utils";
import {
    accepctlistOfAppointment,
    listOfAppointments,
} from "@/redux/slice/appointment-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
    CalendarCheck,
    CalendarDays,
    Clock,
    User,
    XCircle,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterType = "All" | "Confirmed" | "Pending" | "Cancelled";

const AppointmentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, list: pendingList, acceptList, error } = useSelector(
    (state: RootState) => state.appointment,
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = (searchParams.get("status") as FilterType | null) ?? "All";

  const handleFilterChange = (value: FilterType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  useEffect(() => {
    dispatch(listOfAppointments());
    dispatch(accepctlistOfAppointment());
  }, [dispatch]);

  const appointments = useMemo(() => {
    const merged = [...pendingList, ...acceptList];
    const unique = Array.from(
      new Map(merged.map((item) => [item._id, item])).values()
    );
    return unique;
  }, [pendingList, acceptList]);

  const stats = useMemo(() => {
    const total = appointments.length;
    const confirmed = appointments.filter((a) => a.status === "Confirmed").length;
    const pending = appointments.filter((a) => a.status === "Pending").length;
    const cancelled = appointments.filter((a) => a.status === "Cancelled").length;
    const cancellationRate =
      total > 0 ? ((cancelled / total) * 100).toFixed(1) : "0";
    const confirmedRate =
      total > 0 ? ((confirmed / total) * 100).toFixed(0) : "0";
    return {
      total,
      confirmed,
      pending,
      cancelled,
      cancellationRate,
      confirmedRate,
    };
  }, [appointments]);

  const filtered = useMemo(() => {
    if (filter === "All") return appointments;
    return appointments.filter((a) => a.status === filter);
  }, [appointments, filter]);

  const statusConfig = (status: string) => {
    switch (status) {
      case "Confirmed":
        return {
          badge:
            "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
          border: "border-l-green-500",
          icon: <CalendarCheck className="size-3.5" />,
        };
      case "Cancelled":
        return {
          badge:
            "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
          border: "border-l-red-500",
          icon: <XCircle className="size-3.5" />,
        };
      case "Pending":
      default:
        return {
          badge:
            "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
          border: "border-l-orange-500",
          icon: <Clock className="size-3.5" />,
        };
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-4 max-w-7xl mx-auto">
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-10 rounded-xl w-96" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-6 text-center">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ── STATS HEADER ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200 dark:divide-slate-800">
            <div className="p-5 space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total appointments
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.total}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                All time
              </p>
            </div>

            <div className="p-5 space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Confirmed
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.confirmed}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <CalendarCheck className="size-3" />
                {stats.confirmedRate}% of total
              </p>
            </div>

            <div className="p-5 space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Pending
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.pending}
              </p>
              <p className="text-xs text-orange-500 dark:text-orange-400 flex items-center gap-1">
                <Clock className="size-3" />
                Awaiting confirmation
              </p>
            </div>

            <div className="p-5 space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Cancelled
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.cancelled}
              </p>
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                <XCircle className="size-3" />
                {stats.cancellationRate}% cancellation rate
              </p>
            </div>
          </div>
        </div>

        {/* ── FILTER TABS ──────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            All Bookings
          </h1>
          <div className="flex items-center gap-2">
            {(["All", "Confirmed", "Pending", "Cancelled"] as FilterType[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => handleFilterChange(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filter === tab
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        {/* ── EMPTY STATE ──────────────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-60 text-slate-400 space-y-3">
            <CalendarDays className="h-12 w-12 text-slate-300 dark:text-slate-700" />
            <p className="text-base font-medium">No appointments found</p>
          </div>
        )}

        {/* ── BOOKING CARDS ────────────────────────────────────── */}
        <div className="space-y-3">
          {filtered.map((appointment) => {
            const { badge, border, icon } = statusConfig(appointment.status);
            const date = new Date(appointment.date);
            const day = date.getDate().toString().padStart(2, "0");
            const month = date.toLocaleString("default", { month: "short" });

            return (
              <div
                key={appointment._id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 ${border} p-5 flex items-center gap-5`}
              >
                {/* Date block */}
                <div className="shrink-0 text-center w-10">
                  <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                    {day}
                  </p>
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                    {month}
                  </p>
                </div>

                <div className="w-px h-12 bg-slate-200 dark:bg-slate-800 shrink-0" />

                {/* Main info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {appointment.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {appointment.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="size-3" />
                      {appointment.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3" />
                      {formatDateTime(appointment.date)}
                    </span>
                  </div>
                </div>

                {/* Status badge & Actions */}
                <div className="shrink-0 flex items-center gap-3">
                  <span
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${badge}`}
                  >
                    {icon}
                    {appointment.status}
                  </span>
                  {appointment.status === "Pending" && (
                    <AppointmentActions
                      id={appointment._id}
                      status={appointment.status}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
