import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {subSocialApi} from "../slices/subSocialSlice";
import {twitterApi} from "../slices/twitterSlice"

export const store = configureStore({
  reducer: {
    [twitterApi.reducerPath]: twitterApi.reducer,
    [subSocialApi.reducerPath]: subSocialApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(twitterApi.middleware)
    .concat(subSocialApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)