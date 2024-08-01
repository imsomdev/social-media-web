"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/auth.services";

const SIGNUP_CONSTANTS = {
  "First Name": "Enter your first name",
  "Last Name": "Enter your last name",
  Email: "Enter your email",
  Username: "Enter your username",
  Password: "Enter your password",
  "Confirm Password": "Confirm your password",
};

const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "First Name is required" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "First Name must only contain letters",
      }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last Name is required" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Last Name must only contain letters",
      }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters long" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username must only contain letters, numbers, and underscores",
      }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must contain at least 6 characters" })
      .regex(/\d/, { message: "Password must contain at least one digit" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().trim().min(6, {
      message: "Confirm Password must contain at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpMuation = useMutation({
    mutationFn: (data: any) => authServices.signUp(data),
    onSuccess: (res: any) => {
      console.log(res, "success");
    },
  });

  const onSubmit = (data: any) => {
    const transformedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
    };
    signUpMuation.mutate(transformedData);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            {Object.entries(SIGNUP_CONSTANTS).map(([label, placeholder]) => {
              const fieldName = label
                .toLowerCase()
                .replace(/ /g, "_")
                .replace("first_name", "firstName")
                .replace("last_name", "lastName")
                .replace(
                  "confirm_password",
                  "confirmPassword"
                ) as keyof z.infer<typeof SignUpSchema>;

              return (
                <div key={label} className="flex flex-col space-y-1.5">
                  <Label htmlFor={fieldName}>{label}</Label>
                  <Input
                    id={fieldName}
                    placeholder={placeholder}
                    type={label.includes("Password") ? "password" : "text"}
                    {...register(fieldName)}
                  />
                  {errors[fieldName] && (
                    <p className="text-red-500 text-sm">
                      {errors[fieldName]?.message as string}
                    </p>
                  )}
                </div>
              );
            })}
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Signup</Button>
            </CardFooter>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
