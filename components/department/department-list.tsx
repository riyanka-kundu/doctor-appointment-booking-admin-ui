"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ConfirmAlert } from "@/components/confirm-alert";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/utils";
import {
  deleteDepartment,
  listOfDepartment,
} from "@/redux/slice/department-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Building, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const DepartmentList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, list, error } = useSelector(
    (state: RootState) => state.department,
  );

  useEffect(() => {
    dispatch(listOfDepartment());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    const res = await dispatch(deleteDepartment(id));
    if (deleteDepartment.fulfilled.match(res)) {
      toast.success(res.payload.message);
    }
  };

  const accentColors = [
    "bg-blue-500",
    "bg-violet-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-rose-500",
    "bg-cyan-500",
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
        <Skeleton className="h-10 w-48 rounded-xl" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
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
              Departments
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage all departments in your hospital
            </p>
          </div>
          <Link
            href="/department/create"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Department
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
            <Building className="h-12 w-12 text-slate-300 dark:text-slate-700" />
            <p className="text-base font-medium">No departments found</p>
          </div>
        )}

        {/* Department Cards */}
        {!error && list.length > 0 && (
          <div className="space-y-3">
            {list.map((dept, index) => (
              <div
                key={dept._id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 p-5 flex items-center gap-5"
                style={{
                  borderLeftColor: `var(--accent-${index % accentColors.length})`,
                }}
              >
                <div
                  className={`mt-0.5 w-2 h-12 rounded-full ${accentColors[index % accentColors.length]} shrink-0`}
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {dept.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {dept.description}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Created: {formatDateTime(dept.createdAt)}
                  </p>
                </div>

                <ConfirmAlert
                  headerText="Do you really want to delete this department?"
                  subText="This action cannot be undone."
                  icon={<Trash2 className="size-4" />}
                  onConfirm={() => handleDelete(dept._id)}
                  confirmText="Delete"
                  variant="destructive"
                  size="sm"
                  className="rounded-xl"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;
