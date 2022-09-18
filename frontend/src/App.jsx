import Header from "./components/Header/Header"
import CssBaseline from "@mui/material/CssBaseline"
import LineChart from "./components/LineChart/LineChart"
import { Box, Container } from "@mui/material"
import { EquityList } from "./features/equity/Equity"

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh" }}>
        <Header />
        <EquityList />
      </Box>
    </>
  )
}

export default App
