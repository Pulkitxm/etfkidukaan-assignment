import Navbar from "@/components/Navbar";
import EtfRoutes from "@/routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Toaster />
      <div className="h-18">
        <Navbar />
      </div>
      <div className="flex-grow overflow-y-auto">
        <EtfRoutes />
      </div>
    </div>
  );
}
