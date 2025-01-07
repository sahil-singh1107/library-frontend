import { useRecoilState } from 'recoil';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { emailState, pageState } from '@/store/atoms/atoms';

const Sidebar = () => {

    const [email, setEmail] = useRecoilState(emailState)
    const [page, setPage] = useRecoilState(pageState)

    return (
        <div className="w-[15%] flex flex-col justify-between items-center p-4 bg-[#171717]">
            <span className="text-yellow-500 font-bold text-3xl font-title1 text-center">
                Codex
            </span>
            <div className='flex flex-col space-y-8 w-full'>
                <Button className='bg-transparent  rounded-3xl font-title2 hover:bg-[#303131]' onClick={() => setPage("allbooks")}>All Books</Button>
                <Button className='bg-transparent rounded-3xl font-title2 hover:bg-[#303131]' onClick={() => setPage("mybooks")}>My Books</Button>
            </div>
            <div className='flex flex-col items-center space-y-4'>
                <Avatar className='hover:cursor-pointer'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-title2 text-[#ACB3BB] text-xs'>{email}</span>
            </div>
        </div>
    );
}

export default Sidebar;
