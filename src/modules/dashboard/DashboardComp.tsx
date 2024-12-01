"use client";

import PageLoader from "@/components/common/PageLoader";
import ButtonWrapper from "@/components/wrapper/ButtonWrapper";
import InputFieldWrapper from "@/components/wrapper/InputFieldWrapper";
import { PRIMARY_DOMAIN } from "@/constants/AppConstant";
import { usePostRequestHandler } from "@/hooks/requestHandler";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  Container,
  Grid2,
  InputAdornment,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SuccessBoxComp from "./SuccessBox";

const DashboardComp = () => {
  const { user, isLoaded } = useUser();
  const { buttonLoading, submit, isSuccess } = usePostRequestHandler();

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

    await submit("/api/create-workspace", payload);
  };

  const WORKSPACE_FORM = (
    <form onSubmit={handleSubmit((values) => formSubmitHandler(values))}>
      <h2>Create Workspace</h2>
      <p className="mb-4">
        A workspace will help you to play the game with your team member
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
          rules={{
            minLength: {
              value: 3,
              message: "Please enter at least 3 letter",
            },
            maxLength: {
              value: 6,
              message: "Please enter up to 6 letters",
            },
            pattern: {
              value: /^[a-z]{3,6}$/,
              message: "Please enter lowercase letters only",
            },
          }}
          textFieldProps={{
            slotProps: {
              input: {
                startAdornment: (
                  <InputAdornment position="start">https://</InputAdornment>
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
  );

  return !isLoaded ? (
    <PageLoader />
  ) : (
    <div className="company-form">
      <Container>
        <Grid2 container offset={3} size={6}>
          <Card>
            <CardContent>
              {!isSuccess ? WORKSPACE_FORM : <SuccessBoxComp />}
            </CardContent>
          </Card>
        </Grid2>
      </Container>
    </div>
  );
};

export default DashboardComp;
