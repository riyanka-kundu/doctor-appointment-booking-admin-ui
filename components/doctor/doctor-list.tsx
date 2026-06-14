"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { ConfirmAlert } from "@/components/confirm-alert";
import PaginationButton from "@/components/pagination-button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/utils";
import { deleteDoctor, listOfDoctor } from "@/redux/slice/doctor-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  Clock,
  Eye,
  IndianRupee,
  Pen,
  Plus,
  Stethoscope,
  Trash2,
} from "lucide-react";

const DoctorList = () => {
  const [page, setPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, list, error, totalPages } = useSelector(
    (state: RootState) => state.doctor,
  );

  useEffect(() => {
    dispatch(listOfDoctor({ page, limit }));
  }, [dispatch, page, limit]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteDoctor(id)).unwrap();
      await dispatch(listOfDoctor({ page, limit }));
      toast.success("Doctor deleted successfully");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const avatarColors = [
    { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-600 dark:text-blue-400" },
    { bg: "bg-violet-50 dark:bg-violet-950", text: "text-violet-600 dark:text-violet-400" },
    { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-600 dark:text-emerald-400" },
    { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-600 dark:text-orange-400" },
    { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-600 dark:text-rose-400" },
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
        <Skeleton className="h-10 w-48 rounded-xl" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Doctors
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage all doctors in your hospital
            </p>
          </div>
          <Link
            href="/doctors/create"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Doctor
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-6 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!error && list.length === 0 && (
          <div className="flex flex-col items-center justify-center h-60 text-slate-400 space-y-3">
            <Stethoscope className="h-12 w-12 text-slate-300 dark:text-slate-700" />
            <p className="text-base font-medium">No doctors found</p>
          </div>
        )}

        {/* Doctor Cards */}
        {!error && list.length > 0 && (
          <div className="space-y-3">
            {list.map((doc, index) => {
              const color = avatarColors[index % avatarColors.length];
              const initials = doc.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={doc._id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-5"
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color.bg}`}
                  >
                    <span className={`text-sm font-bold ${color.text}`}>
                      {initials}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {doc.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Stethoscope className="size-3" />
                        {doc.department?.name ?? "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="size-3" />
                        ₹{doc.fees}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {doc.schedule?.startTime} – {doc.schedule?.endTime}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Created: {formatDateTime(doc.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    <Link
                      href={`/doctors/${doc._id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition"
                      title="View"
                    >
                      <Eye className="size-4" />
                    </Link>
                    <Link
                      href={`/doctors/update/${doc._id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-orange-950 dark:hover:text-orange-400 transition"
                      title="Edit"
                    >
                      <Pen className="size-4" />
                    </Link>
                    <ConfirmAlert
                      headerText="Delete doctor?"
                      subText="This action cannot be undone."
                      icon={<Trash2 className="size-4" />}
                      onConfirm={() => handleDelete(doc._id)}
                      confirmText="Delete"
                      variant="destructive"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!error && list.length > 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <PaginationButton
              limit={limit}
              onLimitChange={(newLimit) => {
                setPages(1);
                setLimit(newLimit);
              }}
              currentPage={page}
              totalPage={totalPages}
              fetchNextPage={() =>
                setPages((p) => (p < totalPages ? p + 1 : p))
              }
              fetchPreviousPage={() => setPages((p) => (p > 1 ? p - 1 : p))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
