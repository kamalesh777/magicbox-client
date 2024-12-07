import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { red } from "@mui/material/colors";

// Define a type for the slice state
export interface UserSliceTypes {
  loading?: boolean
  details: {
    is_owner: boolean | undefined;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    state?: string;
    pincode?: string;
  };
};



// Define the initial state using that type
const initialState: UserSliceTypes = {
  loading: true,
  details: {
    is_owner: false,
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    pincode: "",
  },
};

export const userDetailSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<UserSliceTypes['details']>) => {
      state.details = { ...action.payload };
      state.loading = false
    },
  },
});

export const { updateUserDetails } = userDetailSlice.actions;

export default userDetailSlice.reducer;
