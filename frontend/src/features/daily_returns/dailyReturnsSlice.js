import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchDailyReturns } from "./dailyReturnsAPI"

export const getDailyReturns = createAsyncThunk(
  "daily_returns/fetchDailyReturns",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchDailyReturns()
      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const dailyReturnsSlice = createSlice({
  name: "daily_returns",
  initialState: {
    daily_returns: [],
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
    [getDailyReturns.pending]: (state) => {
      state.loading = true
    },
    [getDailyReturns.fulfilled]: (state, action) => {
      state.loading = false
      state.daily_returns = action.payload
    },
    [getDailyReturns.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearErrors, destroyState } = dailyReturnsSlice.actions

export const selectDailyReturns = (state) => state.daily_returns

export default dailyReturnsSlice.reducer
