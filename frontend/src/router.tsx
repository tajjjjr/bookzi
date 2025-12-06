import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './components/LandingPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import AccountPage from './components/AccountPage';
import CreateReviewPage from './components/CreateReviewPage';

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
        element: <AccountPage />
      },
      {
        path: "account/review/:productId",
        element: <CreateReviewPage />
      }
    ],
  },
]);

export default router;