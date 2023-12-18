import { createBrowserRouter } from "react-router-dom";
import Content from "../../Public/pages/Content/Content";
import Root from "../../Public/pages/Root/Root"
import AllJobs from "../../Public/pages/Content/AllJobs"
import AddNewJob from "../../dashboard/Pages/AddNewJob"
import Sidebar from "../../dashboard/Sidebar"
import MyProfile from "../../dashboard/Pages/MyProfile"
import Login from "../../Public/pages/Login";
import Detail from "../../Public/pages/JobDetails/detail";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SignUp from "../../Public/SignUp/SignUp";
import MyApplication from "../../dashboard/Pages/MyApplication";
import EmployerJobs from "../../dashboard/Pages/EmployerJobs";
import AllUser from "../../dashboard/Pages/AllUser";
import EmployeeApplication from "../../dashboard/Pages/EmployeeApplication"
import AdminHome from "../../dashboard/Pages/AdminHome";
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
            },
            {
                path: "/detail/:id",
                element: <PrivateRoute><Detail></Detail></PrivateRoute>,
                loader: ({params}) => fetch(`https://bd-job-server.vercel.app/jobs/${params.id}`)
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/alljobs",
                element: <PrivateRoute><AllJobs></AllJobs></PrivateRoute>
            },
        ]
    },
    {
        path: "dashboard",
        element: <Sidebar></Sidebar>,
        children: [
            {
                path : '/dashboard',
                element: <PrivateRoute><AdminHome></AdminHome></PrivateRoute>
            },
            {
                path : '/dashboard/addNewJob',
                element: <PrivateRoute><AddNewJob></AddNewJob></PrivateRoute>
            },
            {
                path: '/dashboard/my-profile/:email',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>,
                loader: ({params}) => fetch(`https://bd-job-server.vercel.app/usere/${params.email}`)
            },
            {
                path: "/dashboard/application/:email",
                element: <MyApplication></MyApplication>,
                loader: ({params}) => fetch(`https://bd-job-server.vercel.app/application/${params.email}`)
            },
            {
                path: "/dashboard/job-posts/:email",
                element: <EmployerJobs></EmployerJobs>,
            },
            {
                path: "/dashboard/all-users",
                element: <AllUser></AllUser>,
            },{
                path: "/dashboard/my-application/:email",
                element: <EmployeeApplication></EmployeeApplication>,

            }
        ]
    }

])


export default Route;