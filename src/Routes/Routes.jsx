import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOuts/Home/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import TaskManagement from "../LayOuts/TaskManagement/TaskManagement";
import TaskHome from "../Pages/TasksPages/TaskHome/TaskHome";
import AllTask from "../Pages/TasksPages/AllTasks/AllTask";
import UpdateTask from "../Pages/TasksPages/UpdateTask/UpdateTask";
import Completed from "../Pages/TasksPages/Completed/Completed";
import NotCompleted from "../Pages/TasksPages/NotCompleted/NotCompleted";
import Important from "../Pages/TasksPages/Important/Important";
import PrivateRoutes from "./PrivateRoutes";






const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path: 'task',
    element: <PrivateRoutes><TaskManagement></TaskManagement></PrivateRoutes>,
    children: [
      {
        path: 'taskHome',
        element: <PrivateRoutes><TaskHome></TaskHome></PrivateRoutes>
      },
      {
        path: 'allTask',
        element: <PrivateRoutes><AllTask></AllTask></PrivateRoutes>
      },
      {
        path: ':updateTask/:id',
        element: <PrivateRoutes><UpdateTask></UpdateTask></PrivateRoutes>,
        loader: ({ params }) => fetch(`https://task-pad-server.vercel.app/specificTask/${params.id}`)
      },
      {
        path: 'completed',
        element: <PrivateRoutes><Completed></Completed></PrivateRoutes>
      },
      {
        path: 'incomplete',
        element: <PrivateRoutes><NotCompleted></NotCompleted></PrivateRoutes>
      },
      {
        path: 'important',
        element: <PrivateRoutes><Important></Important></PrivateRoutes>
      }


    ]
  }
]);


export default router;