"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ClinicCard } from "@/features/clinic/components/ui/card";

export function ClinicDiagnosePatientPage(): JSX.Element {
  const form = useForm();

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Diagnose Patient
        </h1>
        <p className="text-muted-foreground">Diagnose the current patient</p>
      </div>

      <ClinicCard>
        <Tabs defaultValue="soap">
          <TabsList className="flex flex-row justify-start gap-1 mb-4">
            <TabsTrigger value="soap">SOAP</TabsTrigger>
          </TabsList>
          <TabsContent value="soap">
            <Form {...form}>
              <FormField
                control={form.control}
                name="subjective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjektif</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Patient's story of complain, pain, feel etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objektif</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Observation, physical exam and laboratory information summary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assessment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penilaian</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Assessment, a summary of your diagnosis of the patient's existing condition"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rencana</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The treatment plan (e.g., medication, therapies, surgeries)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-end">
                <Button className="mt-4">Simpan</Button>
              </div>
            </Form>
          </TabsContent>
        </Tabs>
      </ClinicCard>
    </div>
  );
}
