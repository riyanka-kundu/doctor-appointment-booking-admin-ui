import { z } from "zod";

export const DepartmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type TDepartmentPayload = z.infer<typeof DepartmentSchema>;
