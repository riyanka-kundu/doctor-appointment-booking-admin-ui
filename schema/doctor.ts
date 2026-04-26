import { z } from "zod";

export const scheduleSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  slotDuration: z.number().positive(),
});

export const createDoctorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  departmentId: z.string().min(1, "Department is required"),
  fees: z.string().min(1, "Fees is required"),
  schedule: scheduleSchema,
});

export type TCreateDoctorSchemaPayload = z.infer<typeof createDoctorSchema>;
