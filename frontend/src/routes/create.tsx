
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createFileRoute } from '@tanstack/react-router'
import AppSidebar from '@/components/AppSidebar'
import { NavBar } from '@/components/Navbar'
import { useForm } from '@tanstack/react-form'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { IoIosArrowDown } from 'react-icons/io'
import { CiCirclePlus } from 'react-icons/ci'
import Editor from '@/components/EditorComponent/Editor'
import { useEffect, useState } from 'react'
import { getBooks } from '@/db/indexedDB'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import * as z from 'zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

interface BookData {
  title: string,
  author: string
}

const bookSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  author: z.string().min(1, "Author is required").max(255, "Author must be less than 255 characters")
})

const defaultBook: BookData = { title: "", author: "" }

const PLACEHOLDERS = [
  // For Partners
  "The Day We Met",
  "Our First Year Together",
  "Why I Knew It Was You",
  "A Million Little Reasons",
  "The Story of Us",
  "Where Our Adventure Began",
  // For Parents/Children
  "To My Son: Everything I Wish I Said",
  "Watching You Bloom (For My Daughter)",
  "A Mother's Hopes and Dreams",
  "Dad's Guide to the World",
  "The Day You Made Me a Father",
  "Letters to My Future Self & My Son",
  // For Friends
  "Partner in Crime: The Best Friend Chronicles",
  "Too Many Inside Jokes to Count",
  "Through Thick and Thin",
  "The Friends Who Became Family",
  "Road Trips and Rainy Days",
  // General/Creative
  "The Last Echo of Summer",
  "Shadows of the Forgotten City",
  "The Alchemist's Secret",
  "Midnight in the Rain",
  "Echoes of a Silent Heart",
]

function RouteComponent() {
  const query = useQuery({ queryKey: ["books"], queryFn: getBooks })
  const form = useForm({
    defaultValues: defaultBook,
    validators: {
      onChange: bookSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    }
  })


  const [booksOpen, setBooksOpen] = useState(false)

  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <div className='flex flex-col items-center w-full relative'>
          <div className="absolute left-4 top-4 z-50">
            <SidebarTrigger />
          </div>
          <NavBar />
          <div className='w-full max-w-5xl mx-auto px-4'>
            {query.data?.length !== 0 ? (
              <>
                <div className='flex mb-4 pt-6'>
                  <DropdownMenu open={booksOpen} onOpenChange={setBooksOpen}>
                    <DropdownMenuTrigger >
                      <div className='text-2xl flex justify-center items-center gap-2 font-medium hover:bg-gray-600/10 p-2 rounded-lg'>
                        Current Book <IoIosArrowDown className={booksOpen ? "rotate-180" : ""} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <CiCirclePlus /> Create New Book
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Editor />
              </>
            ) :
              <Card>
                <CardHeader>
                  <CardTitle className='text-2xl font-bold'>Create your first book</CardTitle>
                  <CardDescription>Don't worry we can change these later</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    id="create-book-form"
                    onSubmit={(e) => {
                      e.preventDefault()
                      form.handleSubmit()
                    }}
                  >
                    <FieldGroup>
                      <form.Field
                        name="title"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Book Title</FieldLabel>
                              <Input
                                placeholder={PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}

                            </Field>
                          )
                        }} />
                      <form.Field
                        name="author"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Author</FieldLabel>
                              <Input
                                placeholder="John Doe"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}

                            </Field>
                          )
                        }} />
                    </FieldGroup>


                  </form>
                </CardContent>
                <CardFooter>
                  <Field orientation="horizontal">
                    <Button type='submit' form='create-book-form'>
                      Create Book
                    </Button>
                  </Field>

                </CardFooter>
              </Card>
            }
          </div>
        </div>
      </SidebarInset>

    </SidebarProvider >

  )
}