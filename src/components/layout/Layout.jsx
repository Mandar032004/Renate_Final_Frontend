import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import SideNavBar from "./SideNavBar";
import { PostJobProvider } from "../../context/PostJobContext";

export default function Layout() {
  return (
    <PostJobProvider>
      <div className="bg-background text-on-surface font-body selection:bg-primary-fixed min-h-screen">
        <SideNavBar />
        {/* Content area starts after the fixed 256px sidebar */}
        <div className="ml-64 flex flex-col min-h-screen">
          <TopNavBar />
          <Outlet />
        </div>
      </div>
    </PostJobProvider>
  );
}
