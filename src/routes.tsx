import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import SingleProjectPage from "./components/SingleProjectPage";
import ErrorPage from "./components/ErorrPage";
import App from "./App";
import ProjectsPage from "./components/ProjectsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      { path: "projects/:id", element: <SingleProjectPage/> },
      { path: "projects/", element: <ProjectsPage/> },
    ],
  },
]);

export default router;