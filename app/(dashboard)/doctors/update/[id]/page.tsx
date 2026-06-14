"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { listOfDepartment } from "@/redux/slice/department-slice";
import { detailsOfDoctor, updateDoctor } from "@/redux/slice/doctor-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { UpdateDoctorInput, UpdateDoctorSchema } from "@/schema/doctor";
import { Skeleton } from "@/components/ui/skeleton";

const UpdateDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.id as string;

  const { selectedDoctor, loading } = useSelector(
    (state: RootState) => state.doctor,
  );
  const { list: departments } = useSelector((state: RootState) => state.department);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateDoctorInput>({
    resolver: zodResolver(UpdateDoctorSchema),
    defaultValues: {
      name: "",
      departmentId: "",
      fees: "",
      schedule: {
        startTime: "",
        endTime: "",
        slotDuration: 0,
      },
    },
  });

  useEffect(() => {
    dispatch(listOfDepartment());
    dispatch(detailsOfDoctor(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedDoctor) {
      reset({
        name: selectedDoctor.name,
        departmentId: selectedDoctor.departmentId,
        fees: selectedDoctor.fees,
        schedule: {
          startTime: selectedDoctor.schedule?.startTime || "",
          endTime: selectedDoctor.schedule?.endTime || "",
          slotDuration: selectedDoctor.schedule?.slotDuration || 0,
        },
      });
    }
  }, [selectedDoctor, reset]);

  async function onSubmit(data: UpdateDoctorInput) {
    try {
      await dispatch(updateDoctor({ id, payload: data })).unwrap();
      toast.success("Doctor updated successfully");
      router.push("/doctors");
    } catch (error) {
      toast.error(error as string);
    }
  }

  if (loading && !selectedDoctor) {
    return (
      <div className="p-6 md:p-8 max-w-xl mx-auto space-y-4">
        <Skeleton className="h-6 w-32 rounded-xl" />
        <Skeleton className="h-125 rounded-2xl" />
      </div>
    );
  }

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

        {/* Update Form Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Update Doctor
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Modify details for Dr. {selectedDoctor?.name || ""}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Doctor Name
              </label>
              <input
                {...register("name")}
                placeholder="Dr. John Doe"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Department
              </label>
              <select
                {...register("departmentId")}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select department</option>
                {departments?.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="text-sm text-red-500">
                  {errors.departmentId.message}
                </p>
              )}
            </div>

            {/* Fees */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Consultation Fees (₹)
              </label>
              <input
                {...register("fees")}
                placeholder="500"
                type="number"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {errors.fees && (
                <p className="text-sm text-red-500">{errors.fees.message}</p>
              )}
            </div>

            {/* Schedule Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Availability Schedule
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Start Time */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Start Time
                  </label>
                  <input
                    {...register("schedule.startTime")}
                    type="time"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.schedule?.startTime && (
                    <p className="text-sm text-red-500">
                      {errors.schedule.startTime.message}
                    </p>
                  )}
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    End Time
                  </label>
                  <input
                    {...register("schedule.endTime")}
                    type="time"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.schedule?.endTime && (
                    <p className="text-sm text-red-500">
                      {errors.schedule.endTime.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Slot Duration */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Slot Duration (Minutes)
                </label>
                <input
                  {...register("schedule.slotDuration", { valueAsNumber: true })}
                  type="number"
                  placeholder="30"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                {errors.schedule?.slotDuration && (
                  <p className="text-sm text-red-500">
                    {errors.schedule.slotDuration.message}
                  </p>
                )}
              </div>
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
                  Updating...
                </>
              ) : (
                "Update Doctor"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDoctor;
