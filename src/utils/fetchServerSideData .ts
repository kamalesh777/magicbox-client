import API from "@/api/preference/API";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

/**
 * Fetch data from the server-side API using a predefined route key.
 *
 * @param endpoint - a api edpoint
 * @returns Response data from the API
 * @throws Error if the request fails or the route key is invalid
 */

interface ServerSideDataResponse<T = any> {
  success: boolean;
  result?: T;
  error?: string;
  status?: number
}

export const fetchServerSideData = async <T = any>(
  endpoint: string
): Promise<ServerSideDataResponse<T>> => {
  try {
    const headersList = headers();
    const host = headersList.get("host");

    // Retrieve the authorization token
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: "Authorization token is missing.",
      };
    }

    // Validate endpoint
    if (!endpoint) {
      return {
        success: false,
        error: `Invalid endpoint: "${endpoint}".`,
      };
    }

    // Make the API request
    const response = await API({
      method: "GET",
      url: endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-client-host": host || "",
      },
    });

    // Return successful response
    return {
      ...response.data,
    };
  } catch (error: any) {
    // Return structured error response
    return {
      ...error.response.data,
    };
  }
};

