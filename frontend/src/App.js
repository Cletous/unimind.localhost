import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Specialists from "./components/Specialists";
import PageNotFound from "./components/PageNotFound";
import MyProfile from "./components/MyProfile";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import RightSideBar from "./components/RightSideBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { currentUser } = useContext(AuthContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="light">
          <Navbar />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightSideBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/my-profile",
          element: <MyProfile />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/specialists",
          element: <Specialists />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
