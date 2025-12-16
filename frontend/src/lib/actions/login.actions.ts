"use server";

import { cookies } from "next/headers";

export async function storeAccessToken(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken);
}
