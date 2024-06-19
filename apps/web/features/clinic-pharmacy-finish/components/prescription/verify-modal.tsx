import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PrescriptionVerifyModalProps {
  onConfirm: () => unknown;
  open: boolean;
  onOpenChange: (value: boolean) => unknown;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function PrescriptionVerifyModal({
  onConfirm,
  onOpenChange,
  open,
  isLoading,
  isDisabled,
}: PrescriptionVerifyModalProps): React.JSX.Element {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button>Selesai</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Apakah Anda yakin?</DialogTitle>
          <DialogDescription>Apakah data obat sudah benar?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="ghost">
            Batal
          </Button>
          <Button
            type="button"
            disabled={isDisabled || isLoading}
            onClick={onConfirm}
          >
            {!isLoading ? "Lanjut" : "Loading..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
