export const Endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/user/logout",
    refresh: "/refresh-token",
  },
  department: {
    create: "/admin/doctor/department",
    list: "/admin/departments/list",
    delete: "/admin/department/delete",
  },
  doctor: {
    create: "/admin/doctor/create",
    list: (params: URLSearchParams) => `/admin/doctor/list?${params}`,
    details: (id: string) => `admin/doctor/details/${id}`,
    update: "/admin/doctor/update",
  },
} as const;
