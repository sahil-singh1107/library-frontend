import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UpdatebookForm from "./UpdatebookForm";

const url1 = import.meta.env.VITE_READ_BOOKS;
const url2 = import.meta.env.VITE_DELETE_BOOK;

interface Book {
  title: string;
  author: string;
  publicationYear: string;
}

const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book>({
    title: "",
    author: "",
    publicationYear: "",
  });
  const { toast } = useToast();

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
  }, []);

  const handleDelete = async (title: string | undefined) => {
    try {
      await axios.post(url2, {
        adminPin: "110703",
        title,
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.title !== title));
      toast({
        title: "Success",
        description: `Book "${title}" has been deleted successfully.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete book "${title}". Please try again later.`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="bg-black border-[#363A3D]">
          <DialogHeader>
            <DialogTitle className="text-white">Update Book</DialogTitle>
            <DialogDescription className="text-white">
              Enter the following details to update the book
            </DialogDescription>
          </DialogHeader>
          <UpdatebookForm setIsOpen={setIsOpen} selectedBook={selectedBook} />
        </DialogContent>
      </Dialog>

      <Table className="mt-6 border rounded-md border-[#363A3D]">
        {books.length === 0 ? (
          <TableCaption className="text-white text-center py-4">
            No books available to display.
          </TableCaption>
        ) : (
          <>
            <TableHeader>
              <TableRow className="bg-[#0C0E10] hover:bg-[#0C0E10] border-[#363A3D]">
                <TableHead className="text-white font-title2 p-5">Title</TableHead>
                <TableHead className="text-white font-title2">Author</TableHead>
                <TableHead className="text-white font-title2">Publication Year</TableHead>
                <TableHead className="text-white font-title2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book, i) => (
                <TableRow
                  key={i}
                  className="bg-[#131718] hover:bg-[#131718] border-[#363A3D]"
                >
                  <TableCell className="p-5 text-white font-title2">
                    {book.title}
                  </TableCell>
                  <TableCell className="text-white font-title2">
                    {book.author}
                  </TableCell>
                  <TableCell className="text-white font-title2">
                    {book.publicationYear}
                  </TableCell>
                  <TableCell className="flex gap-4 text-white items-center mt-1">
                    <span
                      className="text-[#F37877] hover:cursor-pointer"
                      onClick={() => handleDelete(book.title)}
                    >
                      Delete
                    </span>
                    <span
                      className="text-[#24AE7C] hover:cursor-pointer"
                      onClick={() => {
                        setSelectedBook(book);
                        setIsOpen(true);
                      }}
                    >
                      Update
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </>
  );
};

export default BookTable;
