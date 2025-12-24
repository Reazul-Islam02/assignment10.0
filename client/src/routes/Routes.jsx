import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AllVehicles from "../pages/AllVehicles";
import VehicleDetails from "../pages/VehicleDetails";
import PrivateRoute from "./PrivateRoute";
import AddVehicle from "../pages/AddVehicle";
import MyVehicles from "../pages/MyVehicles";
import MyBookings from "../pages/MyBookings";
import UpdateVehicle from "../pages/UpdateVehicle";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/vehicles",
                element: <AllVehicles />,
            },
            {
                path: "/vehicle/:id",
                element: <PrivateRoute><VehicleDetails /></PrivateRoute>,
            },
            {
                path: "/add-vehicle",
                element: <PrivateRoute><AddVehicle /></PrivateRoute>,
            },
            {
                path: "/my-vehicles",
                element: <PrivateRoute><MyVehicles /></PrivateRoute>,
            },
            {
                path: "/my-bookings",
                element: <PrivateRoute><MyBookings /></PrivateRoute>,
            },
            {
                path: "/update-vehicle/:id",
                element: <PrivateRoute><UpdateVehicle /></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
