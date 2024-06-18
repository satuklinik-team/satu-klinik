"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@lezzform/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
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
import { useResetPassword } from "@/services/reset-password/hooks/use-reset-password";
import type { ResetPasswordRequestSchema } from "@/services/reset-password/types/dto";
import { resetPasswordRequestSchema } from "@/services/reset-password/types/dto";

export function ResetPasswordForm(): React.JSX.Element {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  const router = useRouter();

  const form = useForm<ResetPasswordRequestSchema>({
    resolver: zodResolver(resetPasswordRequestSchema),
    defaultValues: {
      resetToken: String(resetToken),
    },
  });

  const { mutateAsync, isPending } = useResetPassword();

  const handleSubmit = useCallback<SubmitHandler<ResetPasswordRequestSchema>>(
    async (values) => {
      try {
        const data = await mutateAsync({
          newPassword: values.newPassword,
          resetToken: String(resetToken),
        });

        router.replace("/auth/login?message=Berhasil reset password!");
        return Boolean(data);
      } catch (error) {
        return false;
      }
    },
    [mutateAsync, resetToken, router],
  );

  useEffect(() => {
    if (!resetToken) return;

    form.reset({ resetToken: String(resetToken) });
  }, [form, resetToken]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Baru</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Masukkan password baru"
                />
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
              <FormLabel>Konfirmasi Password Baru</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Masukkan konfirmasi password baru"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
