import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UploadPool from "./pages/UploadPool";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Conversations from "./pages/Conversations";
import ConversationDetail from "./pages/ConversationDetail";
import WorkProfile from "./pages/WorkProfile";
import Assessments from "./pages/Assessments";
import ProofPages from "./pages/ProofPages";
import Search from "./pages/Search";
import Account from "./pages/Account";
import PublicProofPage from "./pages/PublicProofPage";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "upload", Component: UploadPool },
      { path: "projects", Component: Projects },
      { path: "projects/:id", Component: ProjectDetail },
      { path: "conversations", Component: Conversations },
      { path: "conversations/:id", Component: ConversationDetail },
      { path: "work-profile", Component: WorkProfile },
      { path: "assessments", Component: Assessments },
      { path: "proof-pages", Component: ProofPages },
      { path: "search", Component: Search },
      { path: "account", Component: Account },
    ],
  },
  // Public proof pages (no sidebar)
  {
    path: "/p/:slug",
    Component: PublicProofPage,
  },
  // 404 Not Found
  {
    path: "*",
    Component: NotFound,
  },
]);