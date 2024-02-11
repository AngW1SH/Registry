import { Layout } from "@/widgets/Layout";
import { Sidebar } from "@/widgets/Sidebar";

function App() {
  return <Layout aside={<Sidebar />}>123</Layout>;
}

export default App;
