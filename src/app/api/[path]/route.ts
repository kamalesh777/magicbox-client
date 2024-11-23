import API from "@/api/preference/API";
import apiRoute from "@/constants/ApiConstant";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError, AxiosResponse } from "axios";
import { auth, currentUser } from "@clerk/nextjs/server";

const ERROR_MSG = "Something went wrong";

export async function GET(request: Request) {
  try {
    const {getToken} = await auth()
    const { pathname } = new URL(request.url);
    console.log("===auth", await getToken());
    const ENDPOINT = apiRoute[pathname as keyof typeof apiRoute] as string;
    const token = "abcd"
    const response = await API({
      ...request,
      url: ENDPOINT,
      baseURL: ENDPOINT,
      data: request.body,
      headers: {
        Authorization: `center_token=${token}`,
      },
    });
    const finalResponse = {
      ...response.data,
      message: response.data.message || ERROR_MSG,
    };

    // console.log("=================Try block called");
    return new Response(finalResponse, {
      status: response.status || 200,
    });
  } catch (error) {
    // Handle errors
    // console.log("=================Catch block called", error);
    // if ((error as AxiosError).code === "ENOTFOUND") {
    //   return new Response(axiosResponse.data || {message: "Please check your Internet."});
    // }

    const axiosResponse = (error as AxiosError)?.response as AxiosResponse;
    if (axiosResponse && axiosResponse.status === 404) {
      return new Response(
        axiosResponse.data || { message: "API is not found" }
      );
    }

    return new Response({
      message: ERROR_MSG,
      ...(axiosResponse?.data || {}),
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb", // Set desired value here
    },
  },
};
