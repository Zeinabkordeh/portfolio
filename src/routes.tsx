import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import SingleProjectPage from "./components/SingleProjectPage";
import ErrorPage from "./components/ErorrPage";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      { path: "projects/:id", element: <SingleProjectPage/> },
    ],
  },
]);

export default router;