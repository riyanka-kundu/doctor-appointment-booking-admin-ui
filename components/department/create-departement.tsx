"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { createDepartment } from "@/redux/slice/department-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { DepartmentSchema, TDepartmentPayload } from "@/schema/department";
import { useRouter } from "next/navigation";

const DepartmentForm = () => {
  const form = useForm<TDepartmentPayload>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.department);
  const router = useRouter();

  async function onSubmit(data: TDepartmentPayload) {
    try {
      const res = await dispatch(createDepartment(data)).unwrap();
      toast.success(res.message);

      form.reset();
      router.push("/department");
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Department
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
                    <Input {...field} placeholder="Enter department name" />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Input {...field} placeholder="Enter description" />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Creating..." : "Create Department"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentForm;
