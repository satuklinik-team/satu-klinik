import { type ComponentProps, useCallback, useMemo } from "react";

import { useToast } from "@/components/ui/use-toast";
import { Form as GeneralForm } from "@/lezzform/_generated/generalform";
import { useGetSettings } from "@/services/settings/hooks/use-get-settings";
import { useUpdateSettings } from "@/services/settings/hooks/use-update-settings";

export function SettingGeneralForm(): React.JSX.Element {
  const { data: settingsData, isLoading } = useGetSettings();
  const { toast } = useToast();

  const defaultValues = useMemo<
    ComponentProps<typeof GeneralForm>["defaultValues"]
  >(() => {
    if (!settingsData) return;

    const licenseNumber = !settingsData.license ? "" : settingsData.license;
    const clinicName = !settingsData.name ? "" : settingsData.name;
    const address = !settingsData.address ? "" : settingsData.address;
    const phone = !settingsData.phone ? "" : settingsData.phone;
    const clinicId =
      settingsData.Setting.find((item) => item.name === "FASYANKESID")?.value ??
      "";
    const price = Number(
      settingsData.Setting.find((item) => item.name === "SERVICEFEE")?.value ??
        "0"
    );

    return { licenseNumber, clinicId, clinicName, address, price, phone };
  }, [settingsData]);

  const { mutateAsync: mutateUpdateSettings } = useUpdateSettings();

  const handleSubmit = useCallback<
    Required<ComponentProps<typeof GeneralForm>>["onSubmit"]
  >(
    async (_form, values) => {
      const data = await mutateUpdateSettings({
        address: values.address,
        fasyankesId: values.clinicId,
        license: values.licenseNumber,
        name: values.clinicName,
        phone: values.phone,
        serviceFee: values.price,
      });

      toast({ title: "Berhasil ubah konfigurasi", variant: "success" });

      return Boolean(data);
    },
    [mutateUpdateSettings, toast]
  );

  if (isLoading) return <p className="text-sm">Loading...</p>;

  return <GeneralForm defaultValues={defaultValues} onSubmit={handleSubmit} />;
}
