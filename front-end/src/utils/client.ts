import { ApiResponse } from "@/types";
import { getSession } from "next-auth/react";

interface CustomFetchOptions {
  method?: string;
  data?: any;
  headers?: any;
}

type CustomFetchFunction = (
  url: string,
  data?: Record<string, any>,
) => Promise<any>;

async function createCustomFetch(
  options: CustomFetchOptions = {},
): Promise<CustomFetchFunction> {
  const session = await getSession();
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.user.token || "",
    },
  };

  const fetchOptions: RequestInit = {
    ...defaultOptions,
    ...options,
  };

  return async function (
    path: string,
    data?: Record<string, any>,
  ): Promise<any> {
    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(
        (process.env.API_BASE_URL as string) + path,
        fetchOptions,
      );
      return (await response.json()) as ApiResponse;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };
}

export default createCustomFetch;
