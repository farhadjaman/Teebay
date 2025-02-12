// src/AppRouter.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

const RootLayout = React.lazy(() =>
  import("@/components/layouts").then((module) => ({
    default: module.RootLayout,
  })),
);

const DashboardLayout = React.lazy(() =>
  import("@/components/layouts").then((module) => ({
    default: module.DashboardLayout,
  })),
);

const MyProductsLayout = React.lazy(() =>
  import("@/components/layouts").then((module) => ({
    default: module.MyProductsLayout,
  })),
);
const Products = React.lazy(() => import("@/app/routes/products/products"));
const ProductDetails = React.lazy(
  () => import("@/app/routes/products/product"),
);

const SignIn = React.lazy(() => import("@/app/routes/auth/login"));
const SignUp = React.lazy(() => import("@/app/routes/auth/register"));

const MyProductsList = React.lazy(
  () => import("@/app/routes/app/dashboard/my-products/MyProducts.tsx"),
);
const CreateProduct = React.lazy(
  () => import("@/app/routes/app/dashboard/my-products/Createproducts"),
);
const EditProduct = React.lazy(
  () => import("@/app/routes/app/dashboard/my-products/EditProducts"),
);
const TransactionHistory = React.lazy(
  () => import("@/app/routes/app/dashboard/TransactionHistory"),
);
const NotFound = React.lazy(() => import("@/app/routes/not-found.tsx"));

const router = createBrowserRouter([
  // Public routes (using RootLayout)
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // Marketplace listing (all products)
        index: true,
        element: <Products />,
      },
      {
        // Alternatively, you can also use the explicit route:
        path: paths.marketplace.list.path, // "/products"
        element: <Products />,
      },
      {
        // Product detail page
        path: paths.marketplace.detail.path, // "/products/:productId"
        element: <ProductDetails />,
      },
      {
        // Authentication pages
        path: paths.auth.login.path, // "/login"
        element: <SignIn />,
      },
      {
        path: paths.auth.register.path, // "/register"
        element: <SignUp />,
      },
      // 404 Route
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  // Protected Dashboard routes
  {
    path: paths.app.dashboard.root.path,
    element: (
      // <ProtectedRoute>
      <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: paths.app.dashboard.myProducts.list.path,
        element: <MyProductsLayout />,
        children: [
          {
            index: true,
            element: <MyProductsList />,
          },
          {
            path: paths.app.dashboard.myProducts.create.path,
            element: <CreateProduct />,
          },
          {
            path: paths.app.dashboard.myProducts.edit.path,
            element: <EditProduct />,
          },
        ],
      },
      {
        path: paths.app.dashboard.transactionHistory.path,
        element: <TransactionHistory />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
