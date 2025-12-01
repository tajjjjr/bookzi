import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './components/LandingPage';

const router = createBrowserRouter([
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop',
        element: <LandingPage />,
      },
    ],
  },
]);

export default router;