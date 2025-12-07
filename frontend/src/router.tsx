import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./components/LandingPage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import AccountPage from "./components/AccountPage";
import CreateReviewPage from "./components/CreateReviewPage";
import Checkout from "./components/Checkout";
import ThankYouPage from "./components/ThankYouPage";
import AuthPage from "./components/AuthPage";

const router = createBrowserRouter([
  {
    path: "/shop",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ":id",
        element: <ProductPage />,
      },
      {
        path: "/shop/cart",
        element: <CartPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "account/review/:productId",
        element: <CreateReviewPage />,
      },
      {
        path: "/shop/checkout",
        element: <Checkout />,
      },
      {
        path: "/shop/thank-you",
        element: <ThankYouPage />,
      },
      {
        path: "/shop/auth",
        element: <AuthPage />,
      }
    ],
  },
]);

export default router;
