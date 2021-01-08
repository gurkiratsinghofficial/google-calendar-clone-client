import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import sliceConstants from "../../constants/SliceConstants";
import { getJwt, removeFromLocal } from "../../helpers/jwt";

/**initila state for userSlice */
const initialState = {
  user: undefined,
  allUserData: undefined,
  isLoggedIn: false,
  status: sliceConstants.IDLE,
  error: null,
};

/**Thunk for signup new user */
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userInfo) => {
    /**convert JSON to form data */
    const data = new FormData();
    data.append("firstname", userInfo.firstname);
    data.append("lastname", userInfo.lastname);
    data.append("email", userInfo.email);
    data.append("gender", userInfo.gender);
    data.append("address", userInfo.address);
    data.append("phone", userInfo.phone);
    data.append("password", userInfo.password);
    data.append("profilePhoto", userInfo.file);
    try {
      const response = await Axios.post(
        "https://eventify-calendar.herokuapp.com/api/users",
        data
      );
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
/**Thunk to login user */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userInfo) => {
    try {
      const response = await Axios.post(
        "https://eventify-calendar.herokuapp.com/api/users/login",
        userInfo
      );
      localStorage.setItem("JWT", response.data.token);
      removeFromLocal("CART");
      removeFromLocal("WISHLIST");
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
/**Thunk to check the user */
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const jwt = getJwt();
    const response = await Axios.get(
      "https://eventify-calendar.herokuapp.com/api/users/fetchUser",
      {
        headers: { Authorization: `${jwt}` },
      }
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

/**Thunk to fetch All the users*/
export const getAllUserData = createAsyncThunk(
  "user/getAllUserData",
  async () => {
    try {
      const jwt = getJwt();
      const response = await Axios.get(
        "https://eventify-calendar.herokuapp.com/api/users/allUserData",
        {
          headers: { Authorization: `${jwt}` },
        }
      );
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

/**Thunk to edit user details */
export const editUser = createAsyncThunk("user/editUser", async (userInfo) => {
  try {
    const data = new FormData();
    data.append("firstname", userInfo.firstname);
    data.append("lastname", userInfo.lastname);
    data.append("address", userInfo.address);
    data.append("phone", userInfo.phone);
    data.append("profilePhoto", userInfo.profilePhoto);
    const jwt = getJwt();
    const response = await Axios.put("https://eventify-calendar.herokuapp.com/api/users", data, {
      headers: { Authorization: `${jwt}` },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});
/**user slice */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      state.isLoggedIn = false;
      removeFromLocal("JWT");
      removeFromLocal("USER");

      const emptyState = [];
      state.user = emptyState;
      state.status = sliceConstants.IDLE;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state, action) => {
      state.status = sliceConstants.LOADING;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.status = sliceConstants.SUCCEEDED;
    },
    [signupUser.rejected]: (state, action) => {
      state.status = sliceConstants.FAILED;
      state.error = action.error.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = sliceConstants.SUCCEEDED;
      localStorage.setItem("USER", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      if (state.user) state.isLoggedIn = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = sliceConstants.SUCCEEDED;
      state.user = action.payload.user;
      if (state.user) state.isLoggedIn = true;
    },
    [getAllUserData.fulfilled]: (state, action) => {
      state.status = sliceConstants.SUCCEEDED;
      state.allUserData = action.payload.data;
    },
  },
});
export default userSlice.reducer;
export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectAllUserData = (state) => state.user.allUserData;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectAdmin = (state) => state.user.admin;
