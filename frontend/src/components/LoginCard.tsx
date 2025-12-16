"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertTitle } from "./ui/alert";
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

import { storeAccessToken } from "@/lib/actions/login.actions";
import { authLogin } from "@/lib/api/auth.api";

export interface ILoginCredentials {
  username: string;
  password: string;
}

const LoginCard = () => {
  const router = useRouter();

  const [loginCredentials, SetLoginCredentials] = useState<ILoginCredentials>({
    username: "",
    password: "",
  });
  const [isIncorrectCredeentials, setIsIncorrectCredentials] =
    useState<boolean>(false);

  const login = useMutation({
    mutationFn: async (credentials: ILoginCredentials) =>
      await authLogin(credentials),
    onSuccess: async ({ results, error }) => {
      if (!error) {
        await storeAccessToken(results.access_token);
        setIsIncorrectCredentials(false);
        router.replace("/");
      }

      if (error) setIsIncorrectCredentials(true);
    },
    onError: (error) => console.error(error),
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
        {isIncorrectCredeentials && (
          <Alert
            className="mx-auto flex border-red-500 bg-red-100 md:max-w-70 md:justify-center"
            variant="destructive"
          >
            <AlertCircleIcon />
            <AlertTitle>Incorrect login credentials</AlertTitle>
          </Alert>
        )}
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
