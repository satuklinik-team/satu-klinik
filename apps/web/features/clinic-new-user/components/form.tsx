"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailInput,
  Input,
  PasswordInput,
  PhoneNumberInput,
  TextArea,
} from "@lezzform/react";
import { useQueryClient } from "@tanstack/react-query";
import { CreditCard, Mail, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUser } from "@/services/user/hooks/use-create-user";
import type { CreateUserDto } from "@/services/user/types/dto";
import type { UserRole } from "@/services/user/types/entity";
import { UserQueryKeyFactory } from "@/services/user/utils/query-key.factory";
import { numbericRegex, phoneNumberRegex } from "@/utils";

import type { ClinicNewUserSchema } from "../validators";
import { clinicNewUserSchema } from "../validators";

const defaultValues: ClinicNewUserSchema = {
  address: "",
  confirmPassword: "",
  email: "",
  fullname: "",
  nik: "",
  password: "",
  phone: "",
  role: "DOCTOR",
};

export function AddNewUserForm(): React.JSX.Element {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { clinicId } = useParams();

  const form = useForm<ClinicNewUserSchema>({
    resolver: zodResolver(clinicNewUserSchema),
    defaultValues,
  });

  const { toast } = useToast();

  const { mutateAsync, isPending } = useCreateUser();

  const onSubmit = useCallback<SubmitHandler<ClinicNewUserSchema>>(
    async (values) => {
      try {
        const formattedData: CreateUserDto = {
          fullname: values.fullname,
          email: values.email,
          phone: values.phone,
          password: values.password,
          role: values.role as UserRole,
          address: values.address,
          nik: values.nik,
        };

        await mutateAsync(formattedData);
        await queryClient.invalidateQueries({
          queryKey: new UserQueryKeyFactory().lists(),
        });
        toast({ title: "Berhasil Membuat User Baru!", variant: "success" });
        router.push(`/clinic/${clinicId as string}/users`);

        return true;
      } catch (error) {
        return false;
      }
    },
    [clinicId, mutateAsync, queryClient, router, toast],
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  prefixAdornment={{ icon: <User size={18} /> }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <EmailInput
                  {...field}
                  prefixAdornment={{ icon: <Mail size={18} /> }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <PhoneNumberInput
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key.length > 1) return;
                    const isValidKey = phoneNumberRegex.test(e.key);
                    if (!isValidKey) {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIK</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key.length > 1) return;
                    const isValidKey = numbericRegex.test(e.key);
                    if (!isValidKey) {
                      e.preventDefault();
                    }
                  }}
                  prefixAdornment={{ icon: <CreditCard size={18} /> }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <TextArea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <div>
                  <RadioGroup
                    className="flex flex-col space-y-1"
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="dropdown-list-DOCTOR"
                        value="DOCTOR"
                      />
                      <Label htmlFor="dropdown-list-DOCTOR">Dokter</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="dropdown-list-PHARMACY"
                        value="PHARMACY"
                      />
                      <Label htmlFor="dropdown-list-PHARMACY">Apoteker</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="dropdown-list-ADMIN" value="ADMIN" />
                      <Label htmlFor="dropdown-list-ADMIN">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            onClick={() => {
              form.reset(defaultValues);
            }}
            type="button"
            variant="destructive"
          >
            Reset
          </Button>
          <Button disabled={isPending}>
            {!isPending ? "Submit" : "Loading..."}
          </Button>
        </div>
      </form>
    </Form>
  );
}
