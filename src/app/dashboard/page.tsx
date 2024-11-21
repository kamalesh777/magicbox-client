"use client";

import HeaderComp from "@/components/common/Header";
import PageLoader from "@/components/common/PageLoader";
import Toast from "@/components/common/Toast";
import { setPaletteColor } from "@/store/slice/themeSlice";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {user, isLoaded, isSignedIn} = useUser()

  console.log("===", user, isLoaded, isSignedIn);

  const colorHandler = (e: any) => {
    dispatch(
      setPaletteColor({
        primary: {
          main: e.target.value,
        },
      })
    );
  };

  const toastHandler = () => {
    Toast("success", "Hello world");
  };

  return (
    !isLoaded ? (
      <PageLoader />
    ) : (
      <div className="company-form my-5">
        <Container>
          <Grid2 container offset={3} size={6}>
            <Card>
              <CardContent>
                <form>
                  <h2>Create Workspace</h2>
                  <p className="mb-4">
                    A workspace will help you to play the game with your team
                    member
                  </p>
                  <Grid2 size={12}>
                    <div className="mb-3">
                      <TextField size="small" className="w-100" label="Name" />
                    </div>
                    <div className="mb-3">
                      <TextField size="small" className="w-100" label="Email" />
                    </div>
                    <div className="mb-3">
                      <TextField
                        size="small"
                        className="w-100"
                        label="Company Name"
                      />
                    </div>
                    <div className="mb-3">
                      <TextField
                        size="small"
                        className="w-100"
                        label="Workspace Name"
                      />
                    </div>
                    <Button variant="contained">Create Now!</Button>
                  </Grid2>
                </form>
              </CardContent>
            </Card>
          </Grid2>
        </Container>
      </div>
    )
  );
};

export default Dashboard;
