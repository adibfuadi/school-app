"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { AlertCircleIcon, ArrowRight, Loader, Loader2 } from "lucide-react";
import { useAuth } from "~/hooks/useAuth";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const SignInForm = () => {
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().trim().email("Invalid email address").min(1, {
      message: "Email is required",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn, loading, error } = useAuth();
  const testtoast = () => {
    toast.success("This is a success toast!");
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // alert(JSON.stringify(values, null, 2));]
    try {
      const ok = await signIn(values.email, values.password);
      if (ok) {
        //ke dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error(error);
    }
  };
  return (
    <div>
      {/* <Button onClick={testtoast}>Test</Button> */}
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to login to your account
              </p>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="!h-[40px]"
                      {...field}
                    />
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
                  <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="!h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Field>
              <Button type="submit" disabled={loading}>
                {loading && <Loader className="animate-spin" />}
                Login
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
