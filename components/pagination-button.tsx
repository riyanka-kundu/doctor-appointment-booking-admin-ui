import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type PaginationButtonProp = {
  currentPage: number;
  totalPage: number;
  limit: number;
  onLimitChange: (limit: number) => void;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
};

const PaginationButton = ({
  currentPage,
  totalPage,
  limit,
  onLimitChange,
  fetchNextPage,
  fetchPreviousPage,
}: PaginationButtonProp) => {
  if (totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-4 px-4">
      {/* Limit Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows per page:</span>

        <Select
          value={String(limit)}
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <SelectTrigger className="w-[80px] h-8">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((l) => (
              <SelectItem key={l} value={String(l)}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={fetchPreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Previous
        </Button>

        <div className="flex items-center gap-2">
          <span className="font-bold">{currentPage}</span>
          <span className="text-muted-foreground">of</span>
          <span>{totalPage}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchNextPage}
          disabled={currentPage === totalPage}
        >
          Next <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
export default PaginationButton;
