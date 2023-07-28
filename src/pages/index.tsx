import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Calendar from '@/pages/Calendar';
import RequestList from '@/pages/RequestList';
import MyPage from '@/pages/MyPage';
import Layout from '@/pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/main',
        element: <Layout />,
        children: [
          {
            path: '/main/calendar',
            element: <Calendar />,
          },
          {
            path: '/main/request',
            element: <RequestList />,
          },
          {
            path: '/main/mypage',
            element: <MyPage />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
