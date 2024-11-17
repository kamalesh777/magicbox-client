"use client";

import Toast from "@/components/common/Toast";
import { setPaletteColor } from "@/store/slice/themeSlice";
import { Box, Button, Container, Input } from "@mui/material";
import { useDispatch } from "react-redux";

const Dashboard = () => {
   
  const dispatch = useDispatch()

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
    Toast('success', 'Hello world')
  }

  return (
    <Container>
      <Button onClick={toastHandler} variant="contained">
        Click here
      </Button>
      <Box style={{ width: "100px" }}>
        <Input
          type="color"
          className="w-100"
          onChange={(e) => colorHandler(e)}
        />
      </Box>
    </Container>
  );
}

export default Dashboard;