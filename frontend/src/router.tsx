import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './components/LandingPage';
import ProductPage from './components/ProductPage';

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
      }
    ],
  },
]);

export default router;