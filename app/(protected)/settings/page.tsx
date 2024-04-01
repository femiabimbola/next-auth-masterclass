"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SettingSchema} from "@/schemas";
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {settings} from "@/actions/settings";
import {useState, useTransition} from "react";
import {useSession} from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useCurrentUser} from "@/hooks/use-current-user";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const SettingsPage = async () => {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const {update} = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    // undefined instead of "" so the name value remains the same
    defaultValues: {name: user?.name || undefined},
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) setError(data.error);
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center"> Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
            >
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
