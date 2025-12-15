/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Loader } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "~/lib/utils";
import { Textarea } from "../ui/textarea";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Gender, StatusAcount } from "~/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { transformOptions } from "~/lib/helper";
import { useAuth } from "~/hooks/useAuth";

export default function CreateStudentForm(props: { onClose: () => void }) {
  const formSchema = z.object({
    email: z.string().trim().email("Invalid email address").min(1, {
      message: "Email is required",
    }),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().optional(),
    address: z.string().optional(),
    gender: z.enum(Object.values(Gender) as [keyof typeof Gender], {
      required_error: "Gender is required",
    }),
    statusAccount: z.enum(
      Object.values(StatusAcount) as [keyof typeof StatusAcount],
      {
        required_error: "Status Account is required",
      },
    ),
    birthDate: z.date({
      required_error: "A date of birth is required.",
    }),
  });

  const genderList = Object.values(Gender); // ["Male", "Female"]
  const genderData = transformOptions(genderList);

  const statusAccountList = Object.values(StatusAcount);
  const statusAccountData = transformOptions(statusAccountList);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    },
  });

  const utils = api.useUtils();

  const createStudent = api.student.createStudent.useMutation();

  // const { signUp, loading, error } = useAuth();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    createStudent.mutate(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        gender: values.gender,
        statusAccount: values.statusAccount,
        birthDate: values.birthDate.toISOString(),
      },
      {
        onSuccess() {
          // await signUp(values.firstName, "YourDefaultPassword123!", val);
          utils.student.getStudent.invalidate();
          utils.student.getStudentStats.invalidate();
          props.onClose();
          toast.success("Student created successfully");
        },
        onError(error) {
          toast.error(`Error creating student: ${error.message}`);
        },
      },
    );
  };
  return (
    <div className="h-auto w-full max-w-full">
      <div className="h-full">
        <div className="mb-5 border-b pb-2">
          <h1 className="mb-1 text-center text-xl font-semibold tracking-[-0.16px] sm:text-left dark:text-[#fcfdffef]">
            Create Student
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Organize and manage student, resources, and team collaboration
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full gap-3">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jhon"
                          className="!h-[48px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dhoe"
                          className="!h-[48px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
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
                        placeholder="Jhon@gmail.com"
                        className="!h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderData?.map((gender) => (
                          <SelectItem
                            className="!capitalize"
                            key={gender.value}
                            value={gender.value}
                          >
                            {gender.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* {Due Date} */}
            <div className="!mt-2">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full flex-1 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border shadow-sm"
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type phone number..."
                        type="number"
                        className="!h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Type address..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="statusAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a status account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusAccountData?.map((status) => (
                          <SelectItem
                            className="!capitalize"
                            key={status.value}
                            value={status.value}
                          >
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant={"outline"} onClick={props.onClose} type="button">
                Cancel
              </Button>
              <Button
                disabled={createStudent.isPending}
                className="flex h-[40px]"
                type="submit"
              >
                {createStudent.isPending && <Loader className="animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
