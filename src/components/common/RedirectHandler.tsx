"use client";

import { Box, Card, CardContent, Grid2 } from "@mui/material";
import ButtonWrapper from "../wrapper/ButtonWrapper";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface PropTypes {
  workspace_url: string
  is_owner: boolean
  host: string
}

export default function RedirectHandler(result: PropTypes) {
  const router = useRouter()
  const { signOut } = useAuth()
  const { workspace_url } = result;
  const targetUrl = workspace_url?.startsWith("http") ? workspace_url : `https://${workspace_url}`;

  const redirectFunc = () => {
    router.push(targetUrl)
    // signOut();
  }

  return (
    <div className="company-form">
      <Grid2 container  alignItems="center" justifyContent="center">
        <Grid2 size={6}>
          <Card>
            <CardContent>
              <Box className="text-center">
                <p>You are not belong this current workspace, please click below to visit your workspace {targetUrl}</p>
                <ButtonWrapper className="mt-3" onClick={redirectFunc}>Redirect</ButtonWrapper>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  )
}
