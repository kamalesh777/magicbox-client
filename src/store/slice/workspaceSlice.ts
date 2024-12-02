import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { red } from "@mui/material/colors";

// Define a type for the slice state
interface WorkspaceSlice {
  company_id?: string
  company_name?: string
  email?: string
  user_id?: string
}

// Define the initial state using that type
const initialState: WorkspaceSlice = {
  company_id: '',
  company_name: '',
  email: '',
  user_id: ''
};

export const workspaceSlice = createSlice({
  name: "workspace",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateWorkspace: (state, action: PayloadAction<WorkspaceSlice>) => {
      state = { ...action.payload };
    },
  },
});

export const { updateWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
