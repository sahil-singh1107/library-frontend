import { Separator } from "@/components/ui/separator"
import AllBooks from "./AllBooks"
import UserBooks from "./UserBooks"
import { useRecoilState } from "recoil"
import { pageState } from "@/store/atoms/atoms"

const Display = () => {

    const [page, setPage] = useRecoilState(pageState)

    return (
        <div className='w-[85%] bg-[#010100]'>
            {
                page === "allbooks" ? (
                    <div className='mt-10 ml-10 flex flex-col'>
                        <p className='text-white text-6xl font-title2'>List of all Books</p>
                        <p className='text-white mt-3'>Click on a book to borrow it.</p>
                        <Separator className="mt-4 border border-[#A1A0AB]" />
                        <AllBooks  />
                    </div>
                ) : (
                    <div className='mt-10 ml-10 flex flex-col'>
                        <p className='text-white text-6xl font-title2'>List of your Books</p>
                        <p className='text-white mt-3'>Please return them on time</p>
                        <Separator className="mt-4 border border-[#A1A0AB]" />
                        <UserBooks />
                    </div>
                )
            }
        </div>
    )
}

export default Display
