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

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginCard = () => {
  const [loginCredentials, SetLoginCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
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

    console.log(`start login`);
    console.log(loginCredentials);
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
