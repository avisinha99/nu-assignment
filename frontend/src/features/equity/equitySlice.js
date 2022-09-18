import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchEquities } from "./equityAPI"

export const getEquities = createAsyncThunk(
  "equities/fetchEquities",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchEquities()
      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const equitiesSlice = createSlice({
  name: "equities",
  initialState: {
    equities: [],
    loading: false,
    error: null,
  },
  reducers: {
    destroyState: (state, action) => {
      console.log(action)
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
    [getEquities.pending]: (state) => {
      state.loading = true
    },
    [getEquities.fulfilled]: (state, action) => {
      state.loading = false
      state.equities = action.payload
    },
    [getEquities.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearErrors, destroyState } = equitiesSlice.actions

export const selectEquities = (state) => state.equities

export default equitiesSlice.reducer
