import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "../lib/queryClient";
import CascadeOverlay from "./components/CascadeOverlay";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <CascadeOverlay />
    </QueryClientProvider>
  );
}

export default App;
