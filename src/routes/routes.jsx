import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";


const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout></MainLayout>, errorElement: <div>Page not found </div>, children: [

            {path:'/', element: <Home></Home>}

        ]
    }
])


export default router