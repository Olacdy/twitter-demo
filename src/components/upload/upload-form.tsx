"use client";

import { FC, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { uploadSchema } from "@/schemas/upload-schema";

type UploadFormProps = {};

const UploadForm: FC<UploadFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      text: "",
    },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof uploadSchema>) {
    const formData = new FormData();

    formData.append("file", values.file[0]);
    formData.append("text", values.text);

    setIsLoading(true);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setIsLoading(false);

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input disabled={isLoading} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="file"
                  accept="image/*"
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UploadForm;
