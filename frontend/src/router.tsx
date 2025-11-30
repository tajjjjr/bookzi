import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Hero } from './components/Hero';

const router = createBrowserRouter([
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop',
        element: <Hero />,
      },
    ],
  },
]);

export default router;