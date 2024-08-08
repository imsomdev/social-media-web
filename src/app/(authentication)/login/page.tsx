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
import axios from "axios";
import { signIn } from "next-auth/react";

const SIGNUP_CONSTANTS = {
  Username: "Enter your username",
  Password: "Enter your password",
};

const LoginSchema = z.object({
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
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const fetchCsrfToken = async () => {
  //   const response = await axios.get("http://localhost:3000/api/auth/csrf");
  //   return response.data.csrfToken;
  // };

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      // const csrfToken = await fetchCsrfToken();
      return axios.post("http://localhost:3000/api/auth/signin", data, {
        headers: {
          "Content-Type": "application/json",
          // "X-CSRF-Token": csrfToken,
        },
      });
    },
  });

  async function loginHandler(username: string, password: string) {
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "http://localhost:3000",
    });
  }

  const onSubmit = (data: any) => {
    // const transformedData = {
    //   username: data.username,
    //   password: data.password,
    // };
    // loginMutation.mutate(transformedData);
    loginHandler(data.username, data.password);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
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
                ) as keyof z.infer<typeof LoginSchema>;

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
              <Button type="submit">Login</Button>
            </CardFooter>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
