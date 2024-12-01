'use client'

import React, { useEffect } from "react";
import ButtonWrapper from "@/components/wrapper/ButtonWrapper";
import InputFieldWrapper from "@/components/wrapper/InputFieldWrapper";
import { PRIMARY_DOMAIN } from "@/constants/AppConstant";
import { usePostRequestHandler } from "@/hooks/requestHandler";
import { useUser } from "@clerk/nextjs";
import {
  Container,
  Grid2,
  Card,
  CardContent,
  InputAdornment,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";

const AccountComp = () => {
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
  return (
    <div className="company-form">
      {/* <Container> */}
      <Grid2 container alignContent="center" direction="column">
        <Card>
          <CardContent>
            <form
              onSubmit={handleSubmit((values) => formSubmitHandler(values))}
            >
              <h2>Update Account</h2>
              <Box
                component={"p"}
                sx={{ color: "error.main" }}
                className="mb-4"
              >
                *Note: Please provide valid details to avoid any issues later.
              </Box>
              <Grid2 container size={12} columnSpacing={2}>
                <Grid2 size={6}>
                  <InputFieldWrapper
                    label="Name"
                    name="name"
                    control={control}
                    errors={errors}
                    required={true}
                    textFieldProps={{
                      disabled: true,
                    }}
                  />
                </Grid2>
                <Grid2 size={6}>
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
                </Grid2>
              </Grid2>
              <Grid2 size={12}>
                <InputFieldWrapper
                  label="Phone"
                  name="phone"
                  control={control}
                  errors={errors}
                  required={true}
                />

                <InputFieldWrapper
                  label="Address"
                  name="address"
                  control={control}
                  errors={errors}
                  required={true}
                  textFieldProps={{ multiline: true, row: 4 }}
                />

                <InputFieldWrapper
                  label="State"
                  name="state"
                  control={control}
                  errors={errors}
                  required={true}
                />

                <InputFieldWrapper
                  label="Pincode"
                  name="pincode"
                  control={control}
                  errors={errors}
                  required={true}
                />

                <ButtonWrapper loading={buttonLoading} type="submit">
                  Update Now!
                </ButtonWrapper>
              </Grid2>
            </form>
          </CardContent>
        </Card>
      </Grid2>
      {/* </Container> */}
    </div>
  );
};

export default AccountComp;
