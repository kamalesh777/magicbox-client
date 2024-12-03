import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './slice/themeSlice'
import userDetailReducer from "./slice/userSlice";
import { ENVIRONMENT } from "@/constants/AppConstant";


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userDetailReducer,
  },
  devTools: ENVIRONMENT === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;