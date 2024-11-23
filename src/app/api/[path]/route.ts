import API from "@/api/preference/API";
import apiRoute from "@/constants/ApiConstant";
import { AxiosError, AxiosResponse } from "axios";
import { auth } from "@clerk/nextjs/server";
import { dataResponse } from "@/utils/allTypes";

const ERROR_MSG = "Something went wrong";

const responseHandler = (response: dataResponse | dataResponse[], status: number) => {
  return new Response(JSON.stringify(response), {
    status: status || 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function handleRequest(request: Request) {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const { pathname } = new URL(request.url);
    const index = pathname.replace("/api/", "");

    const ENDPOINT = apiRoute[index as keyof typeof apiRoute] as string;

    const isGetMethod = request.method === 'GET'
    const response = await API({
      ...request,
      url: ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const finalResponse = {
      ...response.data,
      message: response.data.message || ERROR_MSG,
    };

    return responseHandler(finalResponse, response.status);

  } catch (error) {
    const axiosResponse = (error as AxiosError)?.response as AxiosResponse;
    if (axiosResponse && axiosResponse.status === 404) {
      return responseHandler(
        axiosResponse.data || { message: "API is not found" },
        404
      );
    }

    return responseHandler(
      {
        message: ERROR_MSG,
        ...(axiosResponse?.data || {}),
      },
      axiosResponse?.status || 500
    );
  }
}

export async function GET(request: Request) {
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}

export async function PUT(request: Request) {
  return handleRequest(request);
}

export async function DELETE(request: Request) {
  return handleRequest(request);
}
