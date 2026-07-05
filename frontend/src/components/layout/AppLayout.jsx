import { SidebarProvider } from "../../context/SidebarContext";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => (
  <SidebarProvider>
    <div className="flex h-screen w-full overflow-hidden bg-canvas">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);

export default AppLayout;
