import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { CartProvider } from "react-use-cart";

import App from "./App";
import { AllData } from "./Data/AllData";

import AllCart from "./Cart/AllCart";
import AllDetails from "./details/AllDetails";
import PageCollection from "./collections/PageCollection";
import AllSingleProduct from "./allsingleproduct/AllSingleProduct";
import AllCraftsman from "./craftsmanship/AllCraftsman";

import AllCompo from "./components/AllCompo";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <AllCompo />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // Home
      {
        path: "/",
        element: <App />,
      },

      // Details
      {
        path: "/AllDetails",
        element: <AllDetails />,
      },

      // Craftsmanship
      {
        path: "/Craftsmanship",
        element: <AllCraftsman />,
      },

      // Collections
      {
        path: "/Collections",
        element: <PageCollection />,
      },

      // Single Product
      {
        path: "/AllSingleProduct/:id",
        element: <AllSingleProduct />,
      },

      // Cart
      {
        path: "/Cart",
        element: <AllCart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AllData>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </AllData>
);