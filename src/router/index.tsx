import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {Dashboard, LandingPage, LoginPage, SignupPage, TicketPage} from "../pages";


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
            Component: Dashboard
        },
        {
            path: "/tickets",
            children: [
                {index: true, Component: TicketPage},
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