import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import BookForm from "@/components/BookForm";
import BookTable from "@/components/BookTable";
import RequestsTable from "@/components/RequestsTable";

const Admin = () => {
    const [activeSection, setActiveSection] = useState<'books' | 'requests'>('books');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Dialog open={isOpen}>
                <DialogContent className="bg-black border-[#363A3D]">
                    <DialogHeader>
                        <DialogTitle className="text-white">Add a Book</DialogTitle>
                        <DialogDescription className="text-white">
                            Enter the following details to add a book
                        </DialogDescription>
                    </DialogHeader>
                    <BookForm setIsOpen={setIsOpen} />
                </DialogContent>
            </Dialog>

            <div className="bg-[#010100] mx-auto flex flex-col space-y-14 h-screen">
                <div className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-[#0C0E10] px-[5%] py-5 shadow-lg xl:px-12;">
                    <span className="ml-10 font-bold text-white text-3xl font-title1">Codex</span>
                    <span className="text-white mr-10 font-bold text-3xl font-title2">Admin Dashboard</span>
                </div>

                <div className="flex flex-col space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12;">
                    <section className='w-full space-y-4'>
                        <h1 className='font-bold text-2xl font-title2 text-white'>Welcome</h1>
                        <p className='text-xl font-title2 text-[#ABB9C5]'>Start the day with adding new books</p>
                    </section>
                    <div className="flex space-x-4 mb-6 justify-between w-full ">
                        <span
                            onClick={() => setActiveSection('books')}
                            className="text-white hover:underline focus:underline hover:cursor-pointer"
                        >
                            Books
                        </span>
                        <span
                            onClick={() => setActiveSection('requests')}
                            className="text-white hover:underline focus:underline hover:cursor-pointer"
                        >
                            Requests
                        </span>
                    </div>
                    {
                        activeSection === "books" ? (
                            <div className="flex flex-col items-center space-y-6">
                                <Button className="text-white bg-transparent border rounded-md border-[#0C0E10]" onClick={() => { setIsOpen(true) }}>Add Book</Button>
                                <div className="flex justify-center w-[70%]">
                                    <BookTable />
                                </div>
                            </div>
                        ) : (
                            <RequestsTable/>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Admin;
