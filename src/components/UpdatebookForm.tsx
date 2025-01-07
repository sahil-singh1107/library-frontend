import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

interface Book {
    title: string
    author: string
    publicationYear: string
}

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    author: z.string().min(3, {
        message: "Author name must be at least 3 characters"
    }),
    publicationYear: z.string().min(4, { message: "Please enter a valid year" }),
})

const url = import.meta.env.VITE_UPDATE_BOOK


const UpdatebookForm = ({ setIsOpen, selectedBook }: { setIsOpen: any, selectedBook: Book }) => {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: selectedBook.title,
            author: selectedBook.author,
            publicationYear: selectedBook.publicationYear
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const updatedBook: Partial<Book> = {};
        if (values.title !== selectedBook.title) updatedBook.title = values.title;
        if (values.author !== selectedBook.author) updatedBook.author = values.author;
        if (values.publicationYear !== selectedBook.publicationYear) updatedBook.publicationYear = values.publicationYear;

        try {
            await axios.put(url, {
                adminPin: "110703",
                newAuthor: updatedBook.author,
                newTitle: updatedBook.title,
                newpublicationYear: updatedBook.publicationYear
            })
            toast({
                variant: "default",
                value: "Book updated successfully",
            });
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                value: "Book was not updated"
            })
        }
        setIsOpen(false)
    }

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="form-labels font-title2">Title</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} className="bg-[#1A1C20] text-white border-[#363A3D] font-title2" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="form-labels font-title2">Author</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} className="bg-[#1A1C20] text-white border-[#363A3D] font-title2" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="publicationYear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="form-labels font-title2">Year of publication</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} className="bg-[#1A1C20] text-white border-[#363A3D] font-title2" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full text-white bg-yellow-500 font-title2 hover:bg-yellow-500" >Submit</Button>
            </form>
        </Form>
    </>
}

export default UpdatebookForm
