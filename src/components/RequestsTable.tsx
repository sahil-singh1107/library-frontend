import axios from "axios";
import { useEffect, useState } from "react"
import { TiTick } from "react-icons/ti";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast";
interface Request {
    email: string
    title: string
}

const url = import.meta.env.VITE_READ_TRANSACTION
const url2 = import.meta.env.VITE_UPDATE_TRANSACTION

const pin = import.meta.env.VITE_ADMIN_PIN

const RequestsTable = () => {

    const [requests, setRequests] = useState<Request[]>([]);
    const {toast} = useToast()

    useEffect(() => {
        async function getBooks() {
            try {
                const res = await axios.get(url);
                const formattedRequests = res.data.message.map((request: any) => ({
                    title: request.book.title,
                    email: request.user.email
                }));

                setRequests(formattedRequests);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        }
        getBooks();
    }, [])

    async function handleUpdate (title : string, email : string) {
        try {
            await axios.put(url2, {
                adminPin : pin,
                email,
                title
            })
            toast({
                variant: "default",
                value : "Request approved successfully",
                description: "User can now access the book"
            })
        } catch (error) {
            toast({
                variant : "destructive",
                value: "Couldn't approve request"
            })
            console.log(error);
        }
    } 

    return (
        <Table className="mt-6 border rounded-md border-[#363A3D]">
            <TableHeader>
                <TableRow className="bg-[#0C0E10] hover:bg-[#0C0E10] border-[#363A3D]">
                    <TableHead className="text-white font-title2 p-5">Book Title</TableHead>
                    <TableHead className="text-white font-title2">User Email</TableHead>
                    <TableHead className="text-white font-title2">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    requests.map((request, i) => (
                        <TableRow key={i} className="bg-[#131718] hover:bg-[#131718] border-[#363A3D]">
                            <TableCell className="p-5 text-white font-title2">{request.title}</TableCell>
                            <TableCell className="text-white font-title2">{request.email}</TableCell>
                            <TableCell className="flex gap-4" onClick={() => {handleUpdate(request.title, request.email)}} ><TiTick className="text-green-500 w-10 h-10 cursor-pointer" /></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default RequestsTable
