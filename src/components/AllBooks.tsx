import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import axios from "axios";

const url1 = import.meta.env.VITE_READ_BOOKS;

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Book {
    title: string;
    author: string;
    publicationYear: string;
    availabilityStatus: boolean;
}

const AllBooks = ({ token }: { token: string }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const { toast } = useToast();

    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {
        async function getBooks() {
            try {
                const res = await axios.get(url1);
                const formattedBooks = res.data.message.map((book: any) => ({
                    title: book.title,
                    author: book.author,
                    publicationYear: book.publicationYear,
                    availabilityStatus: book.availabilityStatus,
                }));
                setBooks(formattedBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        }
        getBooks();
    }, []);

    async function borrowBook(title: string) {
        try {
            await axios.post("http://localhost:3000/api/v1/maketransaction", {
                token,
                title
            })
            toast({
                title: "Success!",
                description: "Wait for an admin to approve the request",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to borrow the book. Please try again later.",
                variant: "destructive",
            });
            console.log(error);
        }
    }

    return (
        <div className="mt-4">
            <div className="flex justify-between p-6">
                <Input className="w-[30%] bg-[#1A1C20] border border-[#2F3336] text-white font-title2" />
                <Button disabled={true} className="w-[30%] bg-[#1A1C20] border border-[#2F3336]">
                    <span className="text-white text-sm font-title2">{today}</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </div>
            <Table className="overflow-y-auto mt-6 border rounded-md">
                <TableHeader>
                    <TableRow className="bg-[#0C0E10] hover:bg-[#0C0E10]">
                        <TableHead className="text-white font-title2 p-5">Title</TableHead>
                        <TableHead className="text-white font-title2">Author</TableHead>
                        <TableHead className="text-white font-title2">Publication Year</TableHead>
                        <TableHead className="text-white font-title2">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book, i) => (
                        <TableRow key={i} className="bg-[#131718] hover:bg-[#131718]">
                            <TableCell className="p-5 text-white font-title2">{book.title}</TableCell>
                            <TableCell className="text-white font-title2">{book.author}</TableCell>
                            <TableCell className="text-white font-title2">{book.publicationYear}</TableCell>
                            <TableCell className="text-white font-title2">
                                <FaBook onClick={() => {
                                    borrowBook(book.title)
                                }} className={book.availabilityStatus ? "text-green-500 hover:cursor-pointer" : "text-gray-500"} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllBooks;
