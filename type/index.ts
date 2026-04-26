export interface IApiResponse {
  Login: {
    status: boolean;
    message: string;
    data: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  IDepartmentApiResponse: {
    status: boolean;
    data: IDepartment[];
    message: string;
  };
}

export interface IDepartment {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  __v: number;
}

export interface IDoctor {
  name: string;
  departmentId: string;
  fees: string;
  schedule: Schedule;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  department: IDepartment;
}

export interface Schedule {
  startTime: string;
  endTime: string;
  slotDuration: number;
}
export interface IDoctorPaginationResponse {
  message: string;
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  data: IDoctor[];
}
