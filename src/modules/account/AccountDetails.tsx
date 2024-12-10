import { Box, Divider, Grid, Grid2, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { startCase } from "lodash";
import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant';
import { Edit } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { UserSliceTypes } from '@/store/slice/userSlice';

const AccountDetails = () => {

  const router = useRouter();
  const userDetails = useSelector((state: RootState) => state.user.details);

  const getFilteredData = (obj: UserSliceTypes['details'], excludeItems: string[]) => {
    return (
      obj &&
      Object.entries(obj)
        .filter((item) => !excludeItems.includes(item[0]))
        .map((arr) => ({ key: arr[0], value: arr[1] }))
    );
  };

  const filterItems = getFilteredData(userDetails, [
    "_id",
    "__v",
    "company_id",
    "user_id",
    "is_owner",
    "created_by",
    "workspace_url"
  ]);

  return (
    userDetails &&
    <Box>
      <Grid2 container>
        <Grid2 size={8}>
          <Box component="h3">User Details</Box>
        </Grid2>
        <Grid2 size={4} className="text-right">
          <Tooltip title="Update details" placement="top">
            <IconButton onClick={() => router.push("/account/update")}>
              <Edit sx={{ fontSize: "16px" }} />
            </IconButton>
          </Tooltip>
        </Grid2>
      </Grid2>
      <Divider className="my-2" />
      {filterItems?.length > 0 ? (
        filterItems?.map((obj: { key: string; value: unknown }) => (
        <Grid2 container className="mb-2">
          <Grid2 size={4}>{startCase(obj?.key)}:</Grid2>
          <Grid2 size={8}>{obj?.value as string || EMPTY_PLACEHOLDER}</Grid2>
        </Grid2>
      ))) : <p>No details added yet, update your details using the pencil icon</p>}
    </Box>
  );
}

export default AccountDetails