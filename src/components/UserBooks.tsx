import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import axios from "axios";

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
import { useRecoilState } from "recoil";
import { tokenState } from "@/store/atoms/atoms";

interface Book {
    title: string;
    author: string;
    publicationYear: string;
}

const url = import.meta.env.VITE_READ_USER_BOOKS
const url1 = import.meta.env.VITE_RETURN_TRANSACTION

const UserBooks = () => {
    const [token, setToken] = useRecoilState(tokenState);
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { toast } = useToast();

    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {
        if (!token) {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
            return;
        }
        async function getBooks() {
            try {
                const res = await axios.post(url, {
                    token,
                });
                const formattedBooks = res.data.message.map((book: any) => ({
                    title: book.title,
                    author: book.author,
                    publicationYear: book.publicationYear,
                }));
                setBooks(formattedBooks);
            } catch (error) {
                console.error(error);
            }
        }
        getBooks();
    }, [token]);

    async function returnBook(title: string) {
        try {
            await axios.put(url1, {
                token,
                title,
            });
            toast({
                variant: "default",
                title: "Success!",
                description: "Book successfully returned",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to return the book. Please try again later.",
                variant: "destructive",
            });
            console.log(error);
        }
    }

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-4">
            <div className="flex flex-col p-6">
                <div className="flex flex-row justify-between">
                    <Input
                        className="w-[30%] bg-[#1A1C20] border border-[#2F3336] text-white font-title2"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button disabled={true} className="w-[30%] bg-[#1A1C20] border border-[#2F3336]">
                        <span className="text-white text-sm font-title2">{today}</span>
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </div>
                <Table className="mt-10 border rounded-md border-[#363A3D]">
                    <TableHeader>
                        <TableRow className="bg-[#0C0E10] hover:bg-[#0C0E10] border-[#363A3D]">
                            <TableHead className="text-white font-title2 p-5">Title</TableHead>
                            <TableHead className="text-white font-title2">Author</TableHead>
                            <TableHead className="text-white font-title2">Publication Year</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBooks.map((book, i) => (
                            <TableRow key={i} className="bg-[#131718] hover:bg-[#131718] border-[#363A3D]">
                                <TableCell className="p-5 text-white font-title2">{book.title}</TableCell>
                                <TableCell className="text-white font-title2">{book.author}</TableCell>
                                <TableCell className="text-white font-title2">{book.publicationYear}</TableCell>
                                <TableCell className="text-white font-title2">
                                    <FaBook
                                        className="text-green-400 cursor-pointer"
                                        onClick={() => returnBook(book.title)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
};

export default UserBooks;
