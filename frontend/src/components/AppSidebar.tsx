import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInset, SidebarTrigger, useSidebar } from "./ui/sidebar";

export default function AppSidebar() {
  const { open } = useSidebar()
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarTrigger />
        <SidebarGroup>
          <SidebarInset>
            <SidebarGroupContent>


              <SidebarHeader>
              </SidebarHeader>
              <SidebarContent>
                this is the content
              </SidebarContent>
            </SidebarGroupContent>
          </SidebarInset>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar >
  )
}