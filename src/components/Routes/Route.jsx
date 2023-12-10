import { createBrowserRouter } from "react-router-dom";
import Content from "../../Public/pages/Content/Content";
import Root from "../../Public/pages/Root/Root"
import AllJobs from "../../Public/pages/Content/AllJobs"
import AddNewJob from "../../dashboard/Pages/AddNewJob"
import Sidebar from "../../dashboard/Sidebar"
import MyProfile from "../../dashboard/Pages/MyProfile"
import Login from "../../Public/pages/Login";
const Route = createBrowserRouter([
    

    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Content />
            },
            {
                path: "/login",
                element: <Login></Login>
            }
        ]
    },
    {
        path: "alljobs",
        element: <AllJobs></AllJobs>
    },
    {
        path: "dashboard",
        element: <Sidebar></Sidebar>,
        children: [
            {
                path : '/dashboard/addNewJob',
                element: <AddNewJob></AddNewJob>
            },
            {
                path: '/dashboard/my-profile',
                element: <MyProfile></MyProfile>
            }
        ]
    }

])


export default Route;