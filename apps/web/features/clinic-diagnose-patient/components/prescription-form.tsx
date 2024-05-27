import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  type PrescriptionEntity,
  prescriptionSchema,
} from "@/services/prescription/types/entity";

interface ClinicDiagnosePatientPrescriptionForm {
  title: string;
  defaultValues?: PrescriptionEntity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (prescription: PrescriptionEntity) => void;
}

export function ClinicDiagnosePatientPrescriptionForm({
  title,
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
}: ClinicDiagnosePatientPrescriptionForm): JSX.Element {
  const form = useForm<PrescriptionEntity>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues,
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
