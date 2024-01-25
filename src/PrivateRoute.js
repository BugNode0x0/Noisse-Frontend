import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Adjust the path as needed to match your directory structure

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="//noisse-frontend.vercel.app/sign-in" />;
};

export default PrivateRoute;
