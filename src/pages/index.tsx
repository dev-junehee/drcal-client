import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from './Login';
import SignUp from './SignUp';
import Calendar from './Calendar';
import RequestList from './RequestList';
import MyPage from './MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Calendar />,
      },
      {
        path: '/request',
        element: <RequestList />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
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
