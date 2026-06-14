"use client";

import {
  Building,
  CalendarCheck,
  CalendarClock,
  ChevronDown,
  Clock,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  accepctlistOfAppointment,
  listOfAppointments,
} from "@/redux/slice/appointment-slice";
import { listOfDepartment } from "@/redux/slice/department-slice";
import { listOfDoctor } from "@/redux/slice/doctor-slice";
import { AppDispatch, RootState } from "@/redux/store/store";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list: doctors, totalItems: numberOfDoctors } = useSelector(
    (state: RootState) => state.doctor,
  );
  const { list: departments } = useSelector(
    (state: RootState) => state.department,
  );
  const {
    list: pendingList,
    acceptList,
    loading,
  } = useSelector((state: RootState) => state.appointment);

  useEffect(() => {
    dispatch(listOfDoctor({ page: 1, limit: 3 }));
    dispatch(listOfDepartment());
    dispatch(listOfAppointments());
    dispatch(accepctlistOfAppointment());
  }, [dispatch]);

  const appointments = useMemo(() => {
    const merged = [...pendingList, ...acceptList];
    const unique = Array.from(
      new Map(merged.map((item) => [item._id, item])).values(),
    );
    return unique;
  }, [pendingList, acceptList]);

  const pendingAppointments = useMemo(
    () => appointments.filter((a) => a.status === "Pending"),
    [appointments],
  );

  const confirmedAppointments = useMemo(
    () => appointments.filter((a) => a.status === "Confirmed"),
    [appointments],
  );

  const avatarColors = [
    {
      bg: "bg-blue-50 dark:bg-blue-950",
      text: "text-blue-600 dark:text-blue-400",
    },
    {
      bg: "bg-violet-50 dark:bg-violet-950",
      text: "text-violet-600 dark:text-violet-400",
    },
    {
      bg: "bg-emerald-50 dark:bg-emerald-950",
      text: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  const accentColors = ["bg-blue-500", "bg-violet-500", "bg-emerald-500"];

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
        <Skeleton className="h-32 rounded-2xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center overflow-hidden">
          {/* Flower decorative image */}
          <div className="relative hidden sm:block h-36 w-32 shrink-0 ml-6">
            <Image
              src="/flower.png"
              alt="Decorative flower"
              fill
              className="object-contain drop-shadow-md"
            />
          </div>

          {/* Greeting */}
          <div className="p-6 flex-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back
            </p>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl">
              Admin Dashboard 👋
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="px-6 pb-6 sm:pb-0 sm:pr-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                  Quick Actions
                  <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                {[
                  {
                    href: "/doctors",
                    icon: Stethoscope,
                    label: "Manage Doctors",
                  },
                  {
                    href: "/department",
                    icon: Building,
                    label: "Manage Departments",
                  },
                  {
                    href: "/appointments",
                    icon: CalendarCheck,
                    label: "All Appointments",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <DropdownMenuItem asChild key={label}>
                    <Link
                      href={href}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Icon size={16} className="text-slate-400" />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
              <Stethoscope
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {numberOfDoctors}
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Doctors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950">
              <Building
                size={22}
                className="text-violet-600 dark:text-violet-400"
              />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {departments.length}
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Departments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-950">
              <CalendarCheck
                size={22}
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {confirmedAppointments.length}
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Confirmed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950">
              <CalendarClock
                size={22}
                className="text-orange-500 dark:text-orange-400"
              />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {pendingAppointments.length}
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Pending Bookings
              </p>
            </div>
          </div>
        </section>

        {/* ── RECENT APPOINTMENTS ──────────────────────────────── */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Pending */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CalendarClock size={15} className="text-orange-500" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Pending
                </p>
              </div>
              <Link
                href="/appointments?status=Pending"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {pendingAppointments.length === 0 ? (
                <p className="p-5 text-sm text-slate-400 dark:text-slate-500 text-center">
                  No pending appointments
                </p>
              ) : (
                pendingAppointments.slice(0, 3).map((appt) => {
                  const date = new Date(appt.date);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  return (
                    <div
                      key={appt._id}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      <div className="shrink-0 text-center w-8">
                        <p className="text-lg font-black text-slate-900 dark:text-white leading-none">
                          {day}
                        </p>
                        <p className="text-xs font-medium text-slate-400 uppercase">
                          {month}
                        </p>
                      </div>
                      <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {appt.name}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {appt.time}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                        Pending
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Confirmed */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CalendarCheck size={15} className="text-green-500" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Confirmed
                </p>
              </div>
              <Link
                href="/appointments?status=Confirmed"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {confirmedAppointments.length === 0 ? (
                <p className="p-5 text-sm text-slate-400 dark:text-slate-500 text-center">
                  No confirmed appointments
                </p>
              ) : (
                confirmedAppointments.slice(0, 3).map((appt) => {
                  const date = new Date(appt.date);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  return (
                    <div
                      key={appt._id}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      <div className="shrink-0 text-center w-8">
                        <p className="text-lg font-black text-slate-900 dark:text-white leading-none">
                          {day}
                        </p>
                        <p className="text-xs font-medium text-slate-400 uppercase">
                          {month}
                        </p>
                      </div>
                      <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {appt.name}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {appt.time}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        Confirmed
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* ── DOCTORS & DEPARTMENTS ─────────────────────────────── */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Doctors */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Doctors
              </p>
              <Link
                href="/doctors"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {doctors.length === 0 ? (
                <p className="p-5 text-sm text-slate-400 dark:text-slate-500 text-center">
                  No doctors found
                </p>
              ) : (
                doctors.slice(0, 3).map((doctor, i) => {
                  const color = avatarColors[i % avatarColors.length];
                  const initials = doctor.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <div
                      key={doctor._id}
                      className="flex items-center justify-between px-5 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${color.bg}`}
                        >
                          <span className={`text-xs font-bold ${color.text}`}>
                            {initials}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {doctor.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {doctor.department?.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                        ₹{doctor.fees}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Departments */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Departments
              </p>
              <Link
                href="/department"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {departments.length === 0 ? (
                <p className="p-5 text-sm text-slate-400 dark:text-slate-500 text-center">
                  No departments found
                </p>
              ) : (
                departments.slice(0, 3).map((department, i) => (
                  <div
                    key={department._id}
                    className="flex items-start gap-4 px-5 py-4"
                  >
                    <div
                      className={`mt-1 w-2 h-10 rounded-full ${accentColors[i % accentColors.length]} shrink-0`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {department.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {department.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
