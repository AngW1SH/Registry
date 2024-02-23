import { ProjectPage } from "@/pages/Project";
import { ProjectSettingsPage } from "@/pages/ProjectSettings";
import { Layout } from "@/widgets/Layout";
import { Sidebar } from "@/widgets/Sidebar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectPage />,
  },
  {
    path: "/settings",
    element: <ProjectSettingsPage />,
  },
]);

function App() {
  return (
    <Layout aside={<Sidebar />}>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
