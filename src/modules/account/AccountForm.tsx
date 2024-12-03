"use-client";

import ButtonWrapper from "@/components/wrapper/ButtonWrapper";
import InputFieldWrapper from "@/components/wrapper/InputFieldWrapper";
import {
  usePostRequestHandler,
} from "@/hooks/requestHandler";
import { RootState } from "@/store/index";
import { useUser } from "@clerk/nextjs";
import { Box, Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface PropTypes {
  data: {
    name?: string;
    email?: string;
    phone?: string;
    state?: string;
    address?: string;
    pincode?: string;
  };
}

const AccountForm = () => {

  const { user } = useUser();
  const userDetails = useSelector((state: RootState) => state.user.details)

  const { buttonLoading, submit } = usePostRequestHandler("put");

  useEffect(() => {
    setValue("name", user?.fullName || userDetails?.name as string);
    setValue(
      "email",
      user?.primaryEmailAddress?.emailAddress || (userDetails?.email as string)
    );
    setValue("phone", userDetails?.phone as string);
    setValue("address", userDetails?.address as string);
    setValue("state", userDetails?.state as string);
    setValue("pincode", userDetails?.pincode as string);
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

  const formSubmitHandler = async (formValues: any) => {
    const payload = {
      ...formValues,
    };

    await submit("/api/update-user", payload, null);
  };

  return (
      <form onSubmit={handleSubmit((values) => formSubmitHandler(values))}>
        <h3>Update Account</h3>
        <Box component={"p"} sx={{ color: "error.main" }} className="mb-4">
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
  );
};

export default AccountForm;