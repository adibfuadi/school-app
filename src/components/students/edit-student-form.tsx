/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Gender, StatusAcount } from "~/constant";
import type { StudentType } from "~/types/api.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Loader } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function EditStudentForm({ student }: { student: StudentType }) {
  const router = useRouter();
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
    // statusAccount: z.enum(
    //   Object.values(StatusAcount) as [keyof typeof StatusAcount],
    //   {
    //     required_error: "Status Account is required",
    //   },
    // ),
    birthDate: z.date({
      required_error: "A date of birth is required.",
    }),
  });

  const genderOptions = Object.values(Gender).map((gender) => ({
    label: gender.charAt(0) + gender.slice(1).toLowerCase(),
    value: gender,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: student.email ?? "",
      firstName: student.firstName ?? "",
      lastName: student.lastName ?? "",
      phone: student.phone ?? "",
      address: student.address ?? "",
      gender: (student.gender as "Male" | "Female") ?? "Male",
      birthDate: student?.birthDate ? new Date(student.birthDate) : new Date(),
    },
  });

  const utils = api.useUtils();

  const updateStudent = api.student.updateStudent.useMutation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // alert(JSON.stringify(values, null, 2));
    updateStudent.mutate(
      {
        id: student.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        gender: values.gender,
        birthDate: values.birthDate.toISOString(),
      },
      {
        onSuccess() {
          utils.student.getStudentById.invalidate({ id: student.id });
          toast.success("Student updates successfully");
        },
        onError(error) {
          toast.error(`Error Update student: ${error.message}`);
        },
      },
    );
  };

  return (
    <div>
      <div className="mb-5 border-b pb-2">
        <h1 className="text-center text-xl font-semibold sm:text-left">
          Edit Student
        </h1>
        <p className="text-muted-foreground text-sm leading-tight">
          Organize and manage student, resources, and team collaboration
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" />
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
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* Status */}
            <div className="w-full">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderOptions.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
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
            <div className="w-full">
              {/* Due Date */}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline">
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full">
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
          <div className="flex justify-end gap-3">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                router.push("/students");
              }}
            >
              Back
            </Button>
            <Button type="submit" disabled={updateStudent.isPending}>
              {updateStudent.isPending && <Loader className="animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
