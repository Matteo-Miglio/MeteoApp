import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Settings from "../components/Settings";


export const router = createBrowserRouter([
    
    {
        patrh: "/",
        Component: Layout,
        children:[
            {
                path: "/",
                Component: Home
            },
            {
                path:"/settings",
                Component: Settings
            }
        ]
    }

]);