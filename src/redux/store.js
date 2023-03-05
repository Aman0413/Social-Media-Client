import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice";
import postsReducer from "./slices/postsSlice";
import feedDataReducer from "./slices/feedSlice";
import commentReducer from "./slices/commentSlice";

export default configureStore({
  reducer: {
    appConfigReducer,
    postsReducer,
    feedDataReducer,
    commentReducer,
  },
});
