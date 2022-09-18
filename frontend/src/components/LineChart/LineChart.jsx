import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectEquities, getEquities } from "../../features/equity/equitySlice"
import { Box, Container, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import CircularProgress from "@mui/material/CircularProgress"
import { ResponsiveLineCanvas } from "@nivo/line"
import "./LineChart.css"

const dummy_data = [
  {
    id: "fake corp. A",
    data: [
      { x: 0, y: 7 },
      { x: 1, y: 5 },
      { x: 2, y: 11 },
      { x: 3, y: 9 },
      { x: 4, y: 13 },
      { x: 7, y: 16 },
      { x: 9, y: 12 },
    ],
  },
]

const styles = {
  height: "70vh",
  "overflow-x": "scroll",
  "overflow-y": "hidden",
  "div:first-child": { width: "200%!important", overflow: "hidden" },
}

const LineChart = ({ data = [], equityId, title }) => {
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 500, margin: "1rem auto" }}>
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            maxWidth: 500,
            margin: "1rem auto",
            textAlign: "center",
          }}
        >
          {`${title} for Equity ID ${equityId}`}
        </Typography>
      </Box>
      <div className="line-chart">
        <ResponsiveLineCanvas
          enableGridX={false}
          // gridXValues={data}
          enablePointLabel={true}
          useMesh={true}
          margin={{ top: 50, right: 180, bottom: 50, left: 100 }}
          pointLabel="yFormatted"
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Returns",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          curve="linear"
          data={[{ id: "FAFE", color: "hsl(342, 70%, 50%)", data: data }]}
        />
      </div>
    </>
  )
}

export default LineChart
