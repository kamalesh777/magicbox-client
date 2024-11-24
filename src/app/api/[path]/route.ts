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
}

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  const index = pathname.replace("/api/", "");

  // it will give the original api endpoint
  const ENDPOINT = apiRoute[index as keyof typeof apiRoute] as string;

  try {
    const { getToken } = await auth();
    const token = await getToken();

    const isGetMethod = request.method === 'GET'
    const response = await API({
      ...request,
      url: ENDPOINT,
      ...(isGetMethod ? {} : {data: request.body}),
      headers: {
        Authorization: `Bearer ${token}`,
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
