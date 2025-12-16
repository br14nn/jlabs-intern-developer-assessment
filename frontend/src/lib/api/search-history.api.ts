"use server";

import { cookies } from "next/headers";
import { backendAPI } from "../axios";

export async function getSearchHistory(): Promise<IResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const { data } = await backendAPI.get("/api/search-history", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return {
        results: null,
        error,
        message: "Request error",
      };
    }

    return {
      results: null,
      error,
      message: error.message,
    };
  }
}
