import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "./pages/login";
import { RegistrationForm } from "./pages/register";
import Verification from "./pages/verification";
import { PostDetailPage } from "./pages/postDetail";
import { ProfilePage } from "./pages/profilePage";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegistrationForm /> },
  { path: "/verification/:token", element: <Verification /> },
  { path: "/post/:id", element: <PostDetailPage /> },
  { path: "/profile", element: <ProfilePage /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
