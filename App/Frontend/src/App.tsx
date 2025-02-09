import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ProductsPage from "@/pages/main/ProductsPage";
import { JSX } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./components/ProductList";
import ErrorPage from "./pages/common/ErrorPage";
import NotFoundPage from "./pages/common/NotFound";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import EditProductPage from "./pages/dashboard/edit/EditProductPage";
import { CategoriesPage } from "./pages/dashboard/new/CategoriesPage";
import { DescriptionPage } from "./pages/dashboard/new/DescriptionPage";
import { PricePage } from "./pages/dashboard/new/PricePage";
import { ProductFormLayout } from "./pages/dashboard/new/ProductFormLayout";
import { SummaryPage } from "./pages/dashboard/new/SummeryPage";
import { TitlePage } from "./pages/dashboard/new/TitlePage";
import HistoryPage from "./pages/history/HistoryPage";
import ProductDetailsPage from "./pages/main/ProductDetailsPage";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, // This will now catch errors for all child routes
    children: [
      {
        index: true, // This replaces the root path
        element: <ProductsPage />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "dashboard/edit/:productId",
        element: <EditProductPage />,
      },
      {
        path: "dashboard/new",
        element: <ProductFormLayout />,
        children: [
          {
            path: "title",
            element: <TitlePage />,
          },
          {
            path: "categories",
            element: <CategoriesPage />,
          },
          {
            path: "description",
            element: <DescriptionPage />,
          },
          {
            path: "price",
            element: <PricePage />,
          },
          {
            path: "summary",
            element: <SummaryPage />,
          },
        ],
      },
      {
        path: "history",
        element: <HistoryPage />,
        children: [
          {
            path: "bought",
            element: <ProductList type="bought" />,
          },
          {
            path: "sold",
            element: <ProductList type="sold" />,
          },
          {
            path: "borrowed",
            element: <ProductList type="borrowed" />,
          },
          {
            path: "lent",
            element: <ProductList type="lent" />,
          },
          {
            path: "",
            element: <ProductList type="bought" />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
