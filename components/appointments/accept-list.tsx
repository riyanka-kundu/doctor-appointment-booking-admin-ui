"use client";
import { accepctlistOfAppointment } from "@/redux/slice/appointment-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AcceptList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { acceptList, loading, error } = useSelector(
    (state: RootState) => state.appointment,
  );

  useEffect(() => {
    dispatch(accepctlistOfAppointment());
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Loading appointments...
      </p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-destructive">{error}</p>;
  }

  if (acceptList.length === 0) {
    return (
      <p className="text-center mt-10 text-muted-foreground">
        No accepted appointments found
      </p>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {acceptList.map((a) => (
        <div key={a._id} className="border rounded-xl p-4 shadow-sm">
          <p>
            <strong>ID:</strong> {a._id}
          </p>
          <p>
            <strong>Patient:</strong> {a.name}
          </p>
          <p>
            <strong>Date:</strong> {a.date}
          </p>
          <p>
            <strong>Status:</strong> {a.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AcceptList;
