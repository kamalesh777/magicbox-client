"use client";

import React, { useEffect } from "react";
import ButtonWrapper from "@/components/wrapper/ButtonWrapper";
import InputFieldWrapper from "@/components/wrapper/InputFieldWrapper";
import {
  useGetRequestHandler,
  usePostRequestHandler,
} from "@/hooks/requestHandler";
import { useUser } from "@clerk/nextjs";
import { Grid2, Card, CardContent, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import PageLoader from "@/components/common/PageLoader";

const AccountComp = () => {
  const { isLoaded, user } = useUser();
  const { isLoading, data, fetchData } = useGetRequestHandler();
  const { buttonLoading, submit } = usePostRequestHandler('put');

  useEffect(() => {
    fetchData("/api/view-user");
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setValue("name", data?.name as string);
      setValue("email", user?.primaryEmailAddress?.emailAddress || data?.email as string);
      setValue("phone", data?.phone as string);
      setValue("address", data?.address as string);
      setValue("state", data?.state as string);
      setValue("pincode", data?.pincode as string);
    }
  }, [isLoading]);

  const formSubmitHandler = async (formValues: any) => {
    const payload = {
      _id: data?._id,
      ...formValues,
    };

    await submit(
      "/api/update-user",
      payload,
      null,
      () => fetchData("/api/view-user")
    );
  };
  return !isLoaded ? (
    <PageLoader />
  ) : (
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
                  rules={{
                    valueAsNumber: true,
                    minLength: {
                      value: 10, // Only allow numbers 0-9
                      message: "Number must be 10 character long",
                    },
                    pattern: {
                      value: /^[0-9]*$/, // Only allow numbers 0-9
                      message: "Number must be between 0 and 9",
                    },
                  }}
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
                  rules={{
                    valueAsNumber: true,
                    pattern: {
                      value: /^\d{6}$/, // Exactly 6 digits
                      message: "Pincode must be exactly 6 digits",
                    },
                  }}
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
