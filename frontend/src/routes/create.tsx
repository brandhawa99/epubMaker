
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute } from '@tanstack/react-router'
import AppSidebar from '@/components/AppSidebar'
import { NavBar } from '@/components/Navbar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { IoIosArrowDown } from 'react-icons/io'
import { CiCirclePlus } from 'react-icons/ci'
import Editor from '@/components/EditorComponent/Editor'

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})


function RouteComponent() {

  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <div className='flex flex-col items-center w-full'>

          <NavBar />
          <DropdownMenu>
            <DropdownMenuTrigger className='self-start'>
              {/* 
                * if no book make the button name the create book
                * else make the button the name of the current book
               */}
              <Button variant="ghost" className='text-2xl flex justify-center font-medium'>
                Current Book <IoIosArrowDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/*
                * map the books and show 
                * item should be a button that switches to the new book
               */}
              <DropdownMenuItem>
                <CiCirclePlus /> Create New Book
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Editor />

      </SidebarInset>

    </SidebarProvider >

  )
}
