import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./app/store"
import App from "./App"
import ErrorPage from "./components/ErrorPage/ErrorPage"

const root = ReactDOM.createRoot(document.getElementById("root"))
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
