import { configureStore } from "@reduxjs/toolkit"
import equitiesReducer from "../features/equity/equitySlice"
import dailyReturnsReducer from "../features/daily_returns/dailyReturnsSlice"
import dailyReturnReducer from "../features/daily_return/dailyReturnSlice"

export default configureStore({
  reducer: {
    equities: equitiesReducer,
    daily_returns: dailyReturnsReducer,
    daily_return: dailyReturnReducer,
  },
})
