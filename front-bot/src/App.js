import Home from "./pages/Home";
import About from "./pages/About";
import Login, { requireLogout } from "./pages/Login";
import Register from "./pages/Register";
import AddPatient from "./pages/AddPatient";
import SearchPatient from "./pages/SearchPatient";
import { requireLogin } from "./pages/Dashboard";
import Root from "./pages/Root";
import { RouterProvider } from "react-router-dom";
import { createHashRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./QueryClient";
import Diagnose from "./pages/Diagnose";
import ResetPassword from "./pages/ResetPassword"

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "",
          index: true,
          element: <Home></Home>,
        },
        {
          path: "about",
          element: <About></About>,
        },
        {
          path: "auth",
          loader: requireLogout,
          children: [
            {
              path: "login",
              element: <Login></Login>,
            },
            {
              path: "register",
              element: <Register></Register>,
            },
          ],
        },
        {
          path: "patient",
          loader: requireLogin,
          children: [
            {
              path: "add",
              element: <AddPatient></AddPatient>,
            },
            {
              path: "search",
              element: <SearchPatient></SearchPatient>,
            },
          ],
        },
        {
          path: "diagnose",
          element: <Diagnose></Diagnose>,
          loader: requireLogin,
        },
        {
          path: "/users/reset-password",
          element: <ResetPassword></ResetPassword>
        }
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}
export default App;
