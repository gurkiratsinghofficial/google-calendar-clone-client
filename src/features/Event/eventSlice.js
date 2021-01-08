import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import sliceConstants from "../../constants/SliceConstants";
import { getJwt } from "../../helpers/jwt";

/**initila state for userSlice */
const initialState = {
  events: undefined,
  modalEvent: undefined,
  status: sliceConstants.IDLE,
  error: null,
};

/**Thunk to fetch events */
export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  try {
    const jwt = getJwt();
    const response = await Axios.get("https://eventify-calendar.herokuapp.com/api/event/fetch", {
      headers: { Authorization: `${jwt}` },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});
/**Thunk for adding new event */
export const addEvent = createAsyncThunk("event/addEvent", async (values) => {
  try {
    const jwt = getJwt();
    const response = await Axios.post(
      "https://eventify-calendar.herokuapp.com/api/event/add",
      values,
      {
        headers: { Authorization: `${jwt}` },
      }
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});
/**Thunk for fetching event details */
export const fetchOneEvent = createAsyncThunk(
  "event/fetchOneEvent",
  async (values) => {
    try {
      const jwt = getJwt();
      const response = await Axios.post(
        "https://eventify-calendar.herokuapp.com/api/event/fetchOneEvent",
        values,
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
/**Thunk for deleting event */
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (values) => {
    try {
      const jwt = getJwt();
      const response = await Axios.post(
        "https://eventify-calendar.herokuapp.com/api/event/delete",
        values,
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
/**Thunk for updating event */
export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (values) => {
    try {
      const jwt = getJwt();
      const response = await Axios.put(
        "https://eventify-calendar.herokuapp.com/api/event/update",
        values,
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

/**user slice */
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state, action) => {
      state.status = sliceConstants.LOADING;
    },

    [fetchEvents.rejected]: (state, action) => {
      state.status = sliceConstants.FAILED;
      state.error = action.error.message;
    },

    [fetchEvents.fulfilled]: (state, action) => {
      state.status = sliceConstants.SUCCEEDED;
      state.events = action.payload.events;
      if (state.user) state.isLoggedIn = true;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.status = sliceConstants.SUCCEEDED;
    },
    [fetchOneEvent.fulfilled]: (state, action) => {
      state.status = sliceConstants.SUCCEEDED;
      state.modalEvent = action.payload;
    },
    [fetchOneEvent.pending]: (state, action) => {
      state.status = sliceConstants.LOADING;
    },
    [fetchOneEvent.rejected]: (state, action) => {
      state.status = sliceConstants.FAILED;
    },
    [updateEvent.fulfilled]: (state, action) => {
      state.status = sliceConstants.SUCCEEDED;
    },
  },
});
export default eventSlice.reducer;
export const selectEvents = (state) => state.event.events;
export const selectModalEvent = (state) => state.event.modalEvent;
