"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { backendAPI } from "@/lib/axios";
import { storeAccessToken } from "@/lib/actions/login.actions";

interface ILoginCredentials {
  username: string;
  password: string;
}

const LoginCard = () => {
  const [loginCredentials, SetLoginCredentials] = useState<ILoginCredentials>({
    username: "",
    password: "",
  });

  const login = useMutation({
    mutationFn: (credentials: ILoginCredentials) =>
      backendAPI.post("/api/auth/login", credentials),
    onSuccess: ({ data }) => storeAccessToken(data.results.access_token),
    onError: (error: any) => console.error(error.response || error.message),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    SetLoginCredentials((oldVal) => ({
      ...oldVal,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login.mutate({ ...loginCredentials });
  };

  return (
    <Card className="h-fit w-full max-w-80 md:max-w-100">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
        <CardDescription className="text-center">
          Login in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FieldSet className="w-full">
            <FieldGroup className="gap-4">
              <Field className="gap-2">
                <FieldLabel>Username</FieldLabel>
                <Input id="username" type="text" onChange={handleChange} />
              </Field>
              <Field className="gap-2">
                <FieldLabel>Password</FieldLabel>
                <Input id="password" type="password" onChange={handleChange} />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Button size="lg" type="submit">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
