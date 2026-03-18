import { CiCirclePlus } from "react-icons/ci";
import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader } from "./ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="font-semibold px-2">Library</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-4 py-2 text-sm text-gray-500">
            This is the content
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button className="w-full" disabled={false}>
          Publish
        </Button>
      </SidebarFooter>
    </Sidebar >
  )
}