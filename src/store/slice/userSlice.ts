import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface UserSliceTypes {
  loading?: boolean;
  details: {
    is_owner: boolean | undefined;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    state?: string;
    pincode?: string;
    workspace_url?: string;
    created_by?: string
  } | null;
};



// Define the initial state using that type
const initialState: UserSliceTypes | null = {
  loading: true,
  details: {
    is_owner: false,
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    pincode: "",
    workspace_url: ""
  },
};

export const userDetailSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<UserSliceTypes>) => {
      state.details = action.payload.details;
      state.loading = action?.payload?.loading || false;
    },
  },
});

export const { updateUserDetails } = userDetailSlice.actions;

export default userDetailSlice.reducer;
