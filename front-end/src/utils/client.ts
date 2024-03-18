interface CustomFetchOptions {
  method?: string;
  data?: any;
  headers?: any;
  auth?: string;
}

type CustomFetchFunction = (
  url: string,
  data?: Record<string, any>,
) => Promise<any>;

function createCustomFetch(
  options: CustomFetchOptions = {},
): CustomFetchFunction {
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.auth || "",
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
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };
}

export default createCustomFetch;