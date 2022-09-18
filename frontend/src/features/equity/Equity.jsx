import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectEquities, getEquities } from "./equitySlice"
import { selectTimeData, getTimeData } from "../daily_return/dailyReturnSlice"
import {
  Box,
  Container,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import CircularProgress from "@mui/material/CircularProgress"
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart"
import LineChart from "../../components/LineChart/LineChart"

export function EquityList() {
  const dispatch = useDispatch()
  const [equityId, setEquityId] = useState()
  const [data, setData] = useState()

  const identifier = "date"
  const attributes = ["returns", "open", "high", "low", "close", "adj_close"]

  const columns = [
    {
      field: "View Daily Returns",
      sortable: false,
      editable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation()
          setEquityId(params.id)
        }

        console.log("DATA: ", data)

        return (
          <Tooltip
            title={`View graph for equity ID ${params.id}`}
            placement="right"
          >
            <IconButton>
              <StackedLineChartIcon
                color="secondary"
                fontSize="large"
                onClick={onClick}
              />
            </IconButton>
          </Tooltip>

          // <Button
          //   variant="contained"
          //   color="primary"
          //   onClick={onClick}
          //   sx={{ px: 4, py: 2 }}
          // >
          //   View Graph
          // </Button>
        )
      },
    },
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      width: 120,
      editable: true,
    },
    {
      field: "ticker",
      headerName: "Ticker",
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      sortable: false,
      type: "date",
    },
    {
      field: "end_date",
      headerName: "End Date",
      sortable: false,
      type: "date",
    },
    {
      field: "sector",
      headerName: "Sector",
      width: 180,
      sortable: false,
    },
    {
      field: "industry",
      headerName: "Industry",
      sortable: false,
    },
    {
      field: "employees_count",
      headerName: "Employees Count",
      sortable: false,

      type: "number",
    },
    {
      field: "sic_no",
      headerName: "Sic No",
      sortable: false,

      type: "number",
    },
    {
      field: "location",
      headerName: "Location",
      sortable: false,
    },
    {
      field: "exchange_id",
      headerName: "Exchange ID",
      sortable: false,

      type: "number",
    },
    {
      field: "cik_no",
      headerName: "CIK No.",
      sortable: false,

      type: "number",
    },
    {
      field: "cusip",
      headerName: "CUS IP",
      sortable: false,

      type: "number",
    },
    {
      field: "currency_id",
      headerName: "Currency ID",
      sortable: false,

      type: "number",
    },
    {
      field: "data_source_id",
      headerName: "Data source ID",
      sortable: false,

      type: "number",
    },
    {
      field: "ckr_log",
      headerName: "CKR Log",
      sortable: false,
    },
    {
      field: "similar_fund_log",
      headerName: "Similar fund log",
      sortable: false,
    },
    {
      field: "address",
      headerName: "Address",
      sortable: false,
    },
    {
      field: "company_name",
      headerName: "Company Name",
      sortable: false,
    },
    {
      field: "phone_no",
      headerName: "Phone No.",
      sortable: false,
    },
    {
      field: "website",
      headerName: "Website",
      sortable: false,
      width: 200,
    },
    {
      field: "is_active",
      headerName: "Is Active",
      sortable: false,

      type: "boolean",
    },
    {
      field: "url_slug",
      headerName: "URL Slug",
      sortable: false,
    },
    {
      field: "delisted_date",
      headerName: "Delisted Date",
      sortable: false,

      type: "date",
    },
    {
      field: "delisted_reason",
      headerName: "Delisted Reason",
      sortable: false,
    },
    {
      field: "image_name",
      headerName: "Image Name",
      sortable: false,
      width: 200,
    },
    {
      field: "image_aspect_ratio",
      headerName: "Image Aspect Ratio",
      sortable: false,

      type: "number",
    },
    {
      field: "cumulative_return_update",
      headerName: "Cumulative Return Update",
      sortable: false,
      width: 250,
      type: "dateTime",
    },
  ]

  const {
    equities,
    loading: eq_loading,
    error: eq_error,
  } = useSelector(selectEquities)

  const {
    time_data,
    loading: dr_loading,
    error: dr_error,
  } = useSelector(selectTimeData)

  useEffect(() => {
    dispatch(getEquities())
    if (eq_error) {
      console.warn("Error in Equity dispatch: ", eq_error)
    }
  }, [dispatch, eq_error])

  useEffect(() => {
    dispatch(getTimeData({ equity_id: equityId })).then((action) => {
      // let returns = action.payload.map((item) => {
      //   return { x: item["date"], y: item["returns"] }
      // })

      let data = {}
      attributes.forEach((attr) => {
        let temp = action.payload.map((item) => {
          return { x: item[identifier], y: item[attr] }
        })
        data[attr] = temp
      })

      setData(data)
      console.log("DATA: ", data)
    })
    if (dr_error) {
      console.warn("Error in TimeData Dispatch: ", dr_error)
    }
  }, [dispatch, dr_error, equityId])

  return !eq_loading ? (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography
          sx={{
            width: "100%",
            maxWidth: 500,
            margin: "1rem auto",
            textAlign: "center",
          }}
          variant="h5"
        >
          List of equities
        </Typography>
        <DataGrid
          rows={equities}
          columns={columns}
          loading={eq_loading}
          pageSize={10}
          rowsPerPageOptions={[
            equities && Math.max(10, Math.floor(equities.length / 10)),
          ]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      {dr_loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={80} thickness={4.0} />
        </Box>
      ) : (
        equityId &&
        time_data &&
        data &&
        attributes.map((attr) => (
          <LineChart equityId={equityId} data={data[attr]} title={attr} />
        ))
      )}
    </>
  ) : (
    <CircularProgress />
  )
}
