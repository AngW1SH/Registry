import { LoginPage } from "@/pages/Login";
import { ProjectPage } from "@/pages/Project";
import { ProjectSettingsPage } from "@/pages/ProjectSettings";
import { Background } from "@/widgets/Background";
import { Layout } from "@/widgets/Layout";
import { Sidebar } from "@/widgets/Sidebar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout aside={<Sidebar />}>
        <ProjectPage />
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout aside={<Sidebar />}>
        <ProjectSettingsPage />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <Background />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
