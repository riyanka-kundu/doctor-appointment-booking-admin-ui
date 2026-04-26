"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { listOfDepartment } from "@/redux/slice/department-slice";
import { createDoctor } from "@/redux/slice/doctor-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  createDoctorSchema,
  TCreateDoctorSchemaPayload,
} from "@/schema/doctor";
import { useRouter } from "next/navigation";

const DoctorForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.doctor);
  const { list } = useSelector((state: RootState) => state.department);
  const router = useRouter();

  const form = useForm<TCreateDoctorSchemaPayload>({
    resolver: zodResolver(createDoctorSchema),
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
  }, [dispatch]);

  async function onSubmit(data: TCreateDoctorSchemaPayload) {
    try {
      const res = await dispatch(createDoctor(data)).unwrap();
      toast.success(res.message);
      router.push("/doctor");
      form.reset();
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Doctor
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input {...field} placeholder="Doctor name" />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Department Dropdown */}
              <Controller
                name="departmentId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Department</FieldLabel>
                    <select {...field} className="w-full border p-2 rounded">
                      <option value="">Select department</option>
                      {list?.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Fees */}
              <Controller
                name="fees"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Fees</FieldLabel>
                    <Input {...field} placeholder="Fees" />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Start Time */}
              <Controller
                name="schedule.startTime"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Start Time</FieldLabel>
                    <Input type="time" {...field} />
                  </Field>
                )}
              />

              {/* End Time */}
              <Controller
                name="schedule.endTime"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>End Time</FieldLabel>
                    <Input type="time" {...field} />
                  </Field>
                )}
              />

              {/* Slot Duration */}
              <Controller
                name="schedule.slotDuration"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Slot Duration (minutes)</FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Creating..." : "Create Doctor"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorForm;
