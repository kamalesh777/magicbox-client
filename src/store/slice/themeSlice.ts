import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ThemeSlice {
  palette: {
    primary: {
      light?: string;
      main?: string;
      dark?: string;
      contrastText?: string;
    };
  };
}

// Define the initial state using that type
const initialState: ThemeSlice = {
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
};

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPaletteColor: (state, action: PayloadAction<ThemeSlice['palette']>) => {
        state.palette = { ...action.payload };
    }
  },
});

export const { setPaletteColor } = themeSlice.actions;

export default themeSlice.reducer;
