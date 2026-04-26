import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";

type ConfirmAlertProp = {
  headerText: string;
  subText: string;
  icon: ReactNode;
  confirmText: string;
  onConfirm?: () => Promise<void>;
  buttonText?: string;
  loading?: boolean;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export function ConfirmAlert({
  loading,
  headerText,
  subText,
  confirmText,
  buttonText,
  icon,
  variant = "outline",
  size = "default",
  className,
  onConfirm,
}: ConfirmAlertProp) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          title={confirmText}
          disabled={loading}
          size={size}
          variant={variant}
          className={className}
        >
          {icon}
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{headerText}</AlertDialogTitle>
          <AlertDialogDescription>{subText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
