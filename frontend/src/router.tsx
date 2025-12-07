import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './components/LandingPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import AccountPage from './components/AccountPage';
import CreateReviewPage from './components/CreateReviewPage';
import Checkout from './components/Checkout';
import AccountLayout from './components/AccountLayout';
import OrdersPage from './components/OrdersPage';
import InboxPage from './components/InboxPage';
import PendingReviewsPage from './components/PendingReviewsPage';
import VouchersPage from './components/VouchersPage';
import WishlistPage from './components/WishlistPage';
import RecentlyViewedPage from './components/RecentlyViewedPage';
import PaymentSettingsPage from './components/PaymentSettingsPage';
import AddressBookPage from './components/AddressBookPage';
import NewsletterPreferencesPage from './components/NewsletterPreferencesPage';
import CloseAccountPage from './components/CloseAccountPage';

const router = createBrowserRouter([
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ":id",
        element: <ProductPage />
      },
      {
        path: '/shop/cart',
        element: <CartPage />,
      },
      {
        path: "account",
        element: <AccountLayout />,
        children: [
          { index: true, element: <AccountPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "inbox", element: <InboxPage /> },
          { path: "pending-reviews", element: <PendingReviewsPage /> },
          { path: "vouchers", element: <VouchersPage /> },
          { path: "wishlist", element: <WishlistPage /> },
          { path: "recently-viewed", element: <RecentlyViewedPage /> },
          { path: "payment", element: <PaymentSettingsPage /> },
          { path: "address", element: <AddressBookPage /> },
          { path: "newsletter", element: <NewsletterPreferencesPage /> },
          { path: "close", element: <CloseAccountPage /> },
          {
            path: "review/:productId",
            element: <CreateReviewPage />
          },
        ]
      },
      {
        path: "/shop/checkout",
        element: <Checkout />
      }
    ],
  },
]);

export default router;