"use client";

import PageLoader from "@/components/common/PageLoader";
import InputFieldWrapper from "@/components/wrapper/InputFieldWrapper";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const {user, isLoaded, isSignedIn} = useUser()

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
    fetch('http://localhost:5000/')
    console.log("===data", isLoaded);
    if (isLoaded) {
      setValue('name', user?.fullName as string)
      setValue("email", user?.primaryEmailAddress?.emailAddress as string);
    }
  }, [isLoaded]);

  return !isLoaded ? (
    <PageLoader />
  ) : (
    <div className="company-form my-5">
      <Container>
        <Grid2 container offset={3} size={6}>
          <Card>
            <CardContent>
              <form
                onSubmit={handleSubmit((data) => console.log("===data", data))}
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
                    disabled
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
                  />

                  <Button variant="contained" type="submit">
                    Create Now!
                  </Button>
                </Grid2>
              </form>
            </CardContent>
          </Card>
        </Grid2>
      </Container>
    </div>
  );
};

export default Dashboard;
