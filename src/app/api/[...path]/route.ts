import API from "@/api/preference/API";
import apiRoute from "@/constants/ApiConstant";
import { AxiosError, AxiosResponse } from "axios";
import { auth } from "@clerk/nextjs/server";
import { dataResponse } from "@/utils/allTypes";

const ERROR_MSG = "Something went wrong";

const responseHandler = (response: unknown, status: number, endpoint: string) => {
  return new Response(JSON.stringify(response), {
    status: status || 200,
    headers: { "Content-Type": "application/json", 'Api-Endpoint': endpoint },
  });
};

async function handleRequest(request: Request): Promise<Response> {
  const nextRequest = new URL(request.url);
  const newUrl = nextRequest.pathname.replace("/api/", "");
  const urlParams = newUrl.split('/');

  // It will give the original API endpoint
  const maskUrl = apiRoute[urlParams?.at(0) as keyof typeof apiRoute] as string;
  // Make the param string after removing the mask URL key (which will come at the first index)
  const paramString = urlParams?.length > 1 ? `/${urlParams.slice(1).join("/")}` : "";
  // After getting the original URL, concatenate with param and search value
  const ENDPOINT = `${maskUrl}${paramString}${nextRequest.search}`;

  try {
    const { getToken } = await auth();
    const token = await getToken();

    const isGetMethod = request.method === 'GET';

    // Read the request body if it's not a GET request
    let bodyData = undefined;
    if (!isGetMethod) {
      // Await the request body to be parsed as JSON for POST/PUT requests
      bodyData = await request.json();
    }

    const response = await API({
      method: request.method, // Pass the correct method
      url: ENDPOINT,
      data: bodyData, // Include bodyData for non-GET methods
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        'Host-url': nextRequest.host,
      },
    });

    const finalResponse = {
      ...response.data,
      message: response.data.message || ERROR_MSG,
    };

    return responseHandler(finalResponse, response.status, ENDPOINT);

  } catch (error) {
    const axiosResponse = (error as AxiosError)?.response as AxiosResponse;
    if (axiosResponse && axiosResponse.status === 404) {
      return responseHandler(
        axiosResponse.data || { message: "API is not found" },
        404,
        ENDPOINT
      );
    }

    // Catch any other errors (e.g., 500 or network-related)
    return responseHandler(
      {
        message: ERROR_MSG,
        ...(axiosResponse?.data || {}),
      },
      axiosResponse?.status || 500,
      ENDPOINT
    );
  }
}

export async function GET(request: Request): Promise<Response> {
  return handleRequest(request);
}

export async function POST(request: Request): Promise<Response> {
  return handleRequest(request);
}

export async function PUT(request: Request): Promise<Response> {
  return handleRequest(request);
}

export async function DELETE(request: Request): Promise<Response> {
  return handleRequest(request);
}
