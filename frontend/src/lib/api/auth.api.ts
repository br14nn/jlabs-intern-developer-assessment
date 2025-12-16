"use server";

import { backendAPI } from "../axios";
import type { ILoginCredentials } from "@/components/LoginCard";

export async function authLogin(
  credentials: ILoginCredentials,
): Promise<IResponse> {
  try {
    const { data } = await backendAPI.post("/api/auth/login", credentials);

    return data;
  } catch (error: any) {
    if (error.response.data) {
      return error.response.data;
    } else if (error.request) {
      return { error: error.request, results: null, message: "request failed" };
    }

    return { results: null, error, message: error.message };
  }
}

export async function authVerify(accessToken: string): Promise<IResponse> {
  try {
    const { data } = await backendAPI.get("/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error: any) {
    if (error.response.data) {
      return error.response.data;
    } else if (error.request) {
      return { error: error.request, results: null, message: "request failed" };
    }

    return { results: null, error, message: error.message };
  }
}
