"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ConfirmAlert } from "@/components/confirm-alert";
import PaginationButton from "@/components/pagination-button";
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
import { listOfDoctor } from "@/redux/slice/doctor-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Eye, Pen, Trash2 } from "lucide-react";

const DoctorList = () => {
  const [page, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, list, error, totalPages } = useSelector(
    (state: RootState) => state.doctor,
  );

  useEffect(() => {
    dispatch(listOfDoctor({ page, limit }));
  }, [dispatch, page, limit]);

  //TODO: Implement delete
  const handleDelete = async (id: string) => {
    console.log("deleting doctor, %s", id);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Doctor List</h1>
        <Button asChild>
          <Link href="/doctors/create-doctor">+ Add Doctor</Link>
        </Button>
      </div>

      {/* Table card */}
      <div className="flex flex-col flex-1 p-2 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
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
            No doctors found
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
                  <TableRow>
                    <TableHead className="w-12">Sl. No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="w-28">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {list.map((doc, index) => (
                    <TableRow key={doc._id}>
                      <TableCell className="text-muted-foreground">
                        {(page - 1) * limit + index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.department.name}</TableCell>
                      <TableCell>{doc.fees}</TableCell>
                      <TableCell>
                        {doc.schedule.startTime} – {doc.schedule.endTime}
                      </TableCell>
                      <TableCell>{formatDateTime(doc.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="size-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Pen className="size-4" />
                          </Button>
                          <ConfirmAlert
                            headerText="Do you really want to delete this doctor?"
                            subText="This action cannot be undone."
                            icon={<Trash2 className="size-4" />}
                            onConfirm={() => handleDelete(doc._id)}
                            confirmText="Delete"
                            variant="destructive"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="border-t border-border">
              <PaginationButton
                limit={limit}
                onLimitChange={(newLimit) => {
                  setPages(1);
                  setLimit(newLimit);
                }}
                currentPage={page}
                totalPage={totalPages}
                fetchNextPage={() =>
                  setPages((p) => (p < totalPages ? p + 1 : p))
                }
                fetchPreviousPage={() => setPages((p) => (p > 1 ? p - 1 : p))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
