import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"


const url1 = import.meta.env.VITE_READ_BOOKS
const url2 = import.meta.env.VITE_DELETE_BOOK

interface Book {
  title: string
  author: string
  publicationYear: string
}

const BookTable = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const { toast } = useToast()

  useEffect(() => {
    async function getBooks() {
      try {
        const res = await axios.get(url1);
        const formattedBooks = res.data.message.map((book: any) => ({
          title: book.title,
          author: book.author,
          publicationYear: book.publicationYear,
        }));

        setBooks(formattedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    getBooks();
  }, [])

  const handleDelete = async (title: string) => {
    try {
      const res = await axios.post(url2, {
        adminPin: "110703",
        title
      })
      console.log(res);
      setBooks((prevBooks) => prevBooks.filter((book) => book.title !== title));
      toast({
        title: "Success",
        description: `Book "${title}" has been deleted successfully.`,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete book "${title}". Please try again later.`,
        variant: "destructive",
      });
    }
  }

  return (
    <Table className="overflow-y-auto mt-6 border rounded-md">
      <TableHeader>
        <TableRow className="bg-[#0C0E10] hover:bg-[#0C0E10]">
          <TableHead className="text-white font-title2 p-5">Title</TableHead>
          <TableHead className="text-white font-title2">Author</TableHead>
          <TableHead className="text-white font-title2">Publication Year</TableHead>
          <TableHead className="text-white font-title2">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          books.map((book, i) => (
            <TableRow key={i} className="bg-[#131718] hover:bg-[#131718]">
              <TableCell className="p-5 text-white font-title2">{book.title}</TableCell>
              <TableCell className="text-white font-title2">{book.author}</TableCell>
              <TableCell className="text-white font-title2">{book.publicationYear}</TableCell>
              <TableCell className="text-[#F37877] hover:cursor-pointer" onClick={() => handleDelete(book.title)}>Delete</TableCell>
              <TableCell className="text-[#24AE7C] hover:cursor-pointer">Update</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>

  )
}

export default BookTable
