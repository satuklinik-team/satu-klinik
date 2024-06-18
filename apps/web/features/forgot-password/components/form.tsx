"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/services/reset-password/hooks/use-forgot-password";
import type { ForgotPasswordRequestSchema } from "@/services/reset-password/types/dto";
import { forgotPasswordRequestSchema } from "@/services/reset-password/types/dto";

export function ForgotPasswordForm(): React.JSX.Element {
  const form = useForm<ForgotPasswordRequestSchema>({
    resolver: zodResolver(forgotPasswordRequestSchema),
  });

  const { mutateAsync, isPending } = useForgotPassword();

  const handleSubmit = useCallback<SubmitHandler<ForgotPasswordRequestSchema>>(
    async (values) => {
      try {
        const data = await mutateAsync(values);
        return Boolean(data);
      } catch (error) {
        return false;
      }
    },
    [mutateAsync],
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="email@example.com" />
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
