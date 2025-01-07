import { useRecoilState } from 'recoil';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { emailState, pageState } from '@/store/atoms/atoms';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [email, ] = useRecoilState(emailState);
    const [page, setPage] = useRecoilState(pageState);
    const navigate = useNavigate();

    return (
        <div className="w-[15%] flex flex-col justify-between items-center p-4 bg-[#171717] transition-all duration-300 ease-in-out">
            <span className="text-yellow-500 font-bold text-3xl font-title1 text-center">
                Codex
            </span>
            <div className="flex flex-col space-y-8 w-full">
                <Button
                    className={`bg-transparent rounded-3xl font-title2 hover:bg-[#303131] ${page === "allbooks" ? 'bg-[#303131]' : ''}`}
                    onClick={() => setPage("allbooks")}
                >
                    All Books
                </Button>
                <Button
                    className={`bg-transparent rounded-3xl font-title2 hover:bg-[#303131] ${page === "mybooks" ? 'bg-[#303131]' : ''}`}
                    onClick={() => setPage("mybooks")}
                >
                    My Books
                </Button>
            </div>
            <div className="flex flex-col items-center space-y-4">
                <Popover>
                    <PopoverTrigger>
                        <Avatar className="hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent
                        className="bg-[#1A1C20] border-[#303131] text-white text-center hover:cursor-pointer hover:underline transition-all duration-300"
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("email");
                            navigate("/signin");
                        }}
                    >
                        Logout
                    </PopoverContent>
                </Popover>

                <span className="font-title2 text-[#ACB3BB] text-xs">{email}</span>
            </div>
        </div>
    );
}

export default Sidebar;
