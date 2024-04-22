import { fetchAllPlatforms } from "@/entities/Platform";
import { LoginPage } from "@/pages/Login";
import { ProjectPage } from "@/pages/Project";
import { ProjectSettingsPage } from "@/pages/ProjectSettings";
import { Background } from "@/widgets/Background";
import { Layout } from "@/widgets/Layout";
import { Sidebar } from "@/widgets/Sidebar";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./store";
import { ProjectListPage } from "@/pages/ProjectList";
const router = createBrowserRouter([
  {
    path: "/metric",
    element: (
      <Layout aside={<Sidebar />}>
        <ProjectListPage />
      </Layout>
    ),
  },
  {
    path: "/metric/project/:id/settings",
    element: (
      <Layout aside={<Sidebar />}>
        <ProjectSettingsPage />
      </Layout>
    ),
  },
  {
    path: "/metric/project/:id",
    element: (
      <Layout aside={<Sidebar />}>
        <ProjectPage />
      </Layout>
    ),
  },
  {
    path: "/metric/login",
    element: <LoginPage />,
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPlatforms());
  }, []);

  return (
    <>
      <Background />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
