"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ConfirmAlert } from "@/components/confirm-alert";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import {
  deleteDepartment,
  listOfDepartment,
} from "@/redux/slice/department-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Trash2 } from "lucide-react";
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

  return (
    <div className="flex flex-col h-full gap-4 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Department List</h1>
        <Button asChild>
          <Link href="/department/create">+ Add Department</Link>
        </Button>
      </div>

      <div className="flex flex-col p-2 flex-1 min-h-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {loading ? (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : error ? (
          <div className="flex flex-1 items-center justify-center text-sm text-destructive">
            {error}
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            No departments found
          </div>
        ) : (
          <div className="flex-1 overflow-auto min-h-0">
            <Table className="table-fixed w-full">
              <TableHeader className="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
                <TableRow>
                  <TableHead className="w-12">Sl. No</TableHead>
                  <TableHead className="w-1/4">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-40">Created At</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {list.map((dept, index) => (
                  <TableRow key={dept._id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium truncate">
                      {dept.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground truncate">
                      {dept.description}
                    </TableCell>
                    <TableCell>{formatDateTime(dept.createdAt)}</TableCell>
                    <TableCell>
                      <ConfirmAlert
                        headerText="Do you really want to delete this department?"
                        subText="This action cannot be undone."
                        icon={<Trash2 className="size-4" />}
                        onConfirm={() => handleDelete(dept._id)}
                        confirmText="Delete"
                        variant="destructive"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;
