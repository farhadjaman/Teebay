import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import {JSX} from "react";


const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Home <Link to="/about">About</Link></div>
    },
    {
        path: '/about',
        element: <div>About</div>
    },
    {
        path: '*',
        element: <div>404 - Page Not Found</div>
    },
]);

export default function App(): JSX.Element {
    return <RouterProvider router={router} />;
}
