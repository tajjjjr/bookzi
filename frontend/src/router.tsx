import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './components/LandingPage';
import CartPage from './components/CartPage';

const router = createBrowserRouter([
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop',
        element: <LandingPage />,
      },
      {
        path: '/shop/cart',
        element: <CartPage />,
      }
    ],
  },
]);

export default router;