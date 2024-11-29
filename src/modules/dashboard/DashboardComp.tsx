"use client";

import API from "@/api/preference/API";
import { getRequest } from "@/api/preference/RequestService";
import PageLoader from "@/components/common/PageLoader";
import ButtonWrapper from "@/components/wrapper/ButtonWrapper";
import InputFieldWrapper from "@/components/wrapper/InputFieldWrapper";
import { PRIMARY_DOMAIN } from "@/constants/AppConstant";
import {
  useGetRequestHandler,
  usePostRequestHandler,
} from "@/hooks/requestHandler";
import { dataResponse } from "@/utils/allTypes";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const DashboardComp = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { buttonLoading, submit } = usePostRequestHandler();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      company_name: "",
      workspace_name: "",
    },
  });

  useEffect(() => {
    if (isLoaded) {
      setValue("name", user?.fullName as string);
      setValue("email", user?.primaryEmailAddress?.emailAddress as string);
    }
  }, [isLoaded]);

  const formSubmitHandler = async (formValues: any) => {
    const payload = {
      ui_project_id: process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID,
      ip_address: process.env.NEXT_PUBLIC_SERVER_IP,
      primary_domain: PRIMARY_DOMAIN,
      ...formValues,
    };

    const data = await submit("/api/create-workspace", payload);
    if (data?.success) {
      const url = data.result.workspace_url as string;
      const newUrl = "https://" + url;
      window.open(newUrl, "_blank");
    }
  };

  return isLoaded ? (
    <PageLoader />
  ) : (
    <div className="company-form my-5">
      <Container>
        <Grid2 container offset={3} size={6}>
          <Card>
            <CardContent>
              <form
                onSubmit={handleSubmit((values) => formSubmitHandler(values))}
              >
                <h2>Create Workspace</h2>
                <p className="mb-4">
                  A workspace will help you to play the game with your team
                  member
                </p>
                <Grid2 size={12}>
                  <InputFieldWrapper
                    label="Name"
                    name="name"
                    control={control}
                    errors={errors}
                    required={true}
                  />

                  <InputFieldWrapper
                    label="Email"
                    name="email"
                    control={control}
                    errors={errors}
                    required={true}
                    textFieldProps={{
                      disabled: true,
                    }}
                  />

                  <InputFieldWrapper
                    label="Company Name"
                    name="company_name"
                    control={control}
                    errors={errors}
                    required={true}
                  />

                  <InputFieldWrapper
                    label="Workspace Name"
                    name="workspace_name"
                    control={control}
                    errors={errors}
                    required={true}
                    textFieldProps={{
                      slotProps: {
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              https://
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              {PRIMARY_DOMAIN}
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />

                  <ButtonWrapper loading={buttonLoading} type="submit">
                    Create Now!
                  </ButtonWrapper>
                </Grid2>
              </form>
            </CardContent>
          </Card>
        </Grid2>
      </Container>
    </div>
  );
};

export default DashboardComp;
