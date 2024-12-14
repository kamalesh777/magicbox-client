import API from "@/api/preference/API";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

const fetchToken = async (token?: string): Promise<string | null> => {
  if (token) {
    return token
  }
  const { getToken } = await auth();
  return getToken();
}

/**
 * Fetch data from the server-side API using a predefined route key.
 *
 * @param endpoint - a api edpoint
 * @returns Response data from the API
 * @throws Error if the request fails or the route key is invalid
 */
export const fetchServerSideData = async (endpoint: string, authToken?: string) => {
  try {

    const headersList = await headers();
    const host = headersList.get("host");

    // Retrieve the authorization token
    const token = await fetchToken(authToken)
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    // Resolve the endpoint using the route key
    if (!endpoint) {
      throw new Error(`Route key "${endpoint}" not found in routesObj.`);
    }

    // Make the API request
    const response = await API({
      method: "GET",
      url: endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-client-host": host, // Update dynamically if needed
      },
    });

    // Return the response data
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch server-side data."
    );
  }
};
