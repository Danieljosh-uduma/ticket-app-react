import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {LandingPage, LoginPage, SignupPage} from "../pages";


export default function AppRouter() {
    const router =createBrowserRouter([
        {
            path: '',
            Component: LandingPage
        },
        {
            path: "/auth",
            children: [
                {index: true, Component: LoginPage},
                {path: "signup", Component: SignupPage}
            ]
        },
        {
            path: "/dashboard",
            element: <h1>dashboard</h1>
        },
        {
            path: "/tickets",
            children: [
                {index: true, element: <h1>tickets list</h1>},
                {path: "create", element: <h1>create ticket</h1>},
                {path: "view", element: <h1>view tickets</h1>}
            ]
        },
        {
            path: "*",
            element: <h1 className="text-6xl text-blue-950 text-center">Not found</h1>
        }
    ])

    return <RouterProvider router={router} />
}