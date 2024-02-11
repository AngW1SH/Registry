import { ProjectPage } from "@/pages/Project";
import { Layout } from "@/widgets/Layout";
import { Sidebar } from "@/widgets/Sidebar";

function App() {
  return (
    <Layout aside={<Sidebar />}>
      <ProjectPage />
    </Layout>
  );
}

export default App;
