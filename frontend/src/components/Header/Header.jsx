import React from "react"
import { AppBar, Toolbar, Typography } from "@mui/material"

const headerStyle = {
  backgroundColor: "#400CCC",
  position: "relative",
  marginBottom: "2rem",
}

const logoStyle = {
  fontFamily: "Work Sans, sans-serif",
  fontWeight: 600,
  color: "#FFFEFE",
  textAlign: "left",
}

const Header = () => {
  return (
    <div>
      <AppBar sx={headerStyle}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={logoStyle}>
            Assignment - Time Series Graphs
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
