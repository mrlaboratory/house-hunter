import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";


const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout></MainLayout>, errorElement: <div>Page not found </div>, children: [

            {path:'/', element: <Home></Home>},
            {path:'/about', element: <About></About>},
            {path:'/contact', element: <Contact></Contact>},
            {path:'/login', element: <Login></Login>},
            {path:'/register', element: <Register></Register>},

        ]
    }
])


export default router