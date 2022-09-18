import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchTimeData } from "./dailyReturnAPI"

export const getTimeData = createAsyncThunk(
  "time_data/fetchTimeData",
  async (data) => {
    const { equity_id, rejectWithValue } = data
    try {
      const data = await fetchTimeData(equity_id)
      return data
    } catch (err) {
      console.log("ERR", err)
      throw rejectWithValue(err)
    }
  }
)

export const dailyReturnSlice = createSlice({
  name: "daily_return",
  initialState: {
    time_data: [],
    loading: false,
    error: null,
  },
  reducers: {
    destroyState: (state, action) => {
      try {
        delete state[action.payload]
      } catch (_) {
        state[action.payload] = null
      }
    },
    clearErrors: (state, action) => {
      state.error = null
    },
  },
  extraReducers: {
    [getTimeData.pending]: (state) => {
      state.loading = true
    },
    [getTimeData.fulfilled]: (state, action) => {
      state.loading = false
      state.time_data = action.payload
    },
    [getTimeData.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearErrors, destroyState } = dailyReturnSlice.actions

export const selectTimeData = (state) => state.daily_return

export default dailyReturnSlice.reducer
