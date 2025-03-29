import { getSidebarTracks } from "@/lib/appwrite/db_services/songs.db.service";
import RightDesktopSidebarInner from "@/components/Layouts/main/DesktopLayout/RightDesktopSidebarInner";

export const revalidate = 200;

const RightDesktopSidebar = async () => {
  const sidebarTracks = await getSidebarTracks(5);

  return <RightDesktopSidebarInner sidebarTracks={sidebarTracks}/>;
};

export default RightDesktopSidebar;
