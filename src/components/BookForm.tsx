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
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"

const url = import.meta.env.VITE_ADD_BOOK

const pin = import.meta.env.VITE_ADMIN_PIN
const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    author: z.string().min(3, {
        message: "Author name must be at least 3 characters"
    }),
    publicationYear: z.string().min(4, { message: "Please enter a valid year" }),
})

const BookForm = ({ setIsOpen }: { setIsOpen: any }) => {

    const { toast } = useToast()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post(url, {
                adminPin : pin,
                title : values.title,
                author : values.author,
                publicationYear: values.publicationYear
            })
            toast({
                variant: "default",
                title: res.data.message
            })
        } catch (error : any) {
            console.log(error);
            toast({
                variant: "destructive",
                title: error.response.data.message
            })
        }
        setIsOpen(false);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel  className="form-labels font-title2">Title</FormLabel>
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
}

export default BookForm
