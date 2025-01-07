import axios from "axios";
import { useEffect, useState } from "react"
import { TiTick } from "react-icons/ti";
import {
    Table,
    TableBody,
    TableCaption,
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

const RequestsTable = () => {

    const [requests, setRequests] = useState<Request[]>([]);
    const {toast} = useToast()

    useEffect(() => {
        async function getBooks() {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/readtransaction");
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
            await axios.put("http://localhost:3000/api/v1/updatetransaction", {
                adminPin : "110703",
                email,
                title
            })
            toast({
                variant: "default",
                value : "Request approved successfully"
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
        <Table className="overflow-y-auto mt-6 border rounded-md">
            <TableHeader>
                <TableRow className="bg-[#0C0E10] hover:bg-[#0C0E10]">
                    <TableHead className="text-white font-title2 p-5">Book Title</TableHead>
                    <TableHead className="text-white font-title2">User Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    requests.map((request, i) => (
                        <TableRow key={i} className="bg-[#131718] hover:bg-[#131718]">
                            <TableCell className="p-5 text-white font-title2">{request.title}</TableCell>
                            <TableCell className="text-white font-title2">{request.email}</TableCell>
                            <TableCell onClick={() => {handleUpdate(request.title, request.email)}} ><TiTick className="text-green-500 w-10 h-10 cursor-pointer" /></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default RequestsTable
