import { getRequest, postRequest, putRequest } from "@/api/preference/RequestService";
import Toast from "@/components/common/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 *
 * @param successToast : boolean default = false
 * @param failToast : boolean default = true
 *! @returns {data, isSuccess, buttonLoading, submit}
 */

export const usePostRequestHandler = (
  method = 'post',
  successToast = true,
  failToast = true,
) => {
  const router = useRouter()
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<any>();

  const submit = async (
    endPoint: string,
    payload?: { [key: string]: unknown },
    goBack?: string | null,
    callBack?: () => void
  ) => {
    if (buttonLoading) return;
    setButtonLoading(true);
    let response;
    try {
      const res =
        method === "post"
          ? await postRequest(endPoint, payload || {})
          : await putRequest(endPoint, payload || {});
      if (res.data.success) {
        setData(res.data.result);
        setIsSuccess(true);

        successToast ? Toast("success", res.data.message) : null;
        goBack && router.push(goBack);
        callBack && callBack();
        // added for get the data after submit
        response = res.data;
      } else {
        const message = res.data.message;
        const msg =
          typeof message === "string"
            ? res.data.message
            : "Got some wrong error message";

        failToast ? Toast("error", msg) : null;
        response = res.data;
      }
    } catch (err) {
      Toast("error", (err as Error).message);
    } finally {
      setButtonLoading(false);
    }
    return response;
  };

  return {
    data,
    isSuccess,
    buttonLoading,
    submit,
  };
};

/**
 *
 * @param successToast : boolean default = false
 * @param failToast : boolean default = true
 *! @returns {data, isSuccess, isLoading, fetchData}
 */
export const useGetRequestHandler = (
  successToast = false,
  failToast = true
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<any>();

  const fetchData = async (
    endPoint: string,
    payload?: { [key: string]: unknown }
  ) => {
    setIsLoading(true);
    try {
      const res = await getRequest(endPoint, {});
      if (res.data.success) {
        setData(res.data.result);
        setIsSuccess(true);
        successToast ? Toast("success", res.data.message) : null;
      } else {
        setData(null);
        failToast
          ? Toast(
              "error",
              res?.data?.message?.length > 0
                ? res?.data?.message
                : "Something Went Wrong"
            )
          : null;
        setIsSuccess(res.data.success);
      }
    } catch (err) {
      Toast("error", (err as Error).message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    setIsLoading,
    isSuccess,
    fetchData,
  };
};
