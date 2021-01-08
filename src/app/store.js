import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "../features/Event/eventSlice";
import userSlice from "../features/User/userSlice";

/**Store Configuration */
export default configureStore({
  reducer: {
    user: userSlice,
    event: eventSlice,
  },
});
