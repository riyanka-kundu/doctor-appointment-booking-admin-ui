"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { createDepartment } from "@/redux/slice/department-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { DepartmentSchema, TDepartmentPayload } from "@/schema/department";

const DepartmentForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.department);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TDepartmentPayload>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: TDepartmentPayload) {
    try {
      const res = await dispatch(createDepartment(data)).unwrap();
      toast.success(res.message);
      reset();
      router.push("/department");
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950 p-6 md:p-8">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Back link */}
        <Link
          href="/department"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back to Departments
        </Link>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Create Department
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Add a new department to your hospital
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Department Name
              </label>
              <input
                {...register("name")}
                placeholder="Enter department name"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Description
              </label>
              <input
                {...register("description")}
                placeholder="Enter description"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Department"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;
