import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <div className="text-white h-[10%] flex items-center justify-between">
      <span className="ml-10 font-bold text-3xl mt-10 font-title1 tracking-wide pt-3 pb-3 pl-6 pr-6 rounded-3xl hover:cursor-pointer hover:text-yellow-500 hover:bg-gray-800 transition ease-in-out duration-300 hover:translate-y-[-10px]">Codex</span>
      <div className="flex space-x-4 mr-10 mt-10">
        <Button className="text-white bg-transparent border rounded-3xl p-4 border-[#696869] font-thin transition ease-in-out duration-300 font-title2 hover:translate-y-[-5px]">Sign up</Button>
        <Button className="text-white bg-transparent border rounded-3xl p-4 border-[#696869] font-thin transition ease-in-out duration-300 font-title2 hover:translate-y-[-5px]">Sign in</Button>
      </div>
    </div>
  )
}

export default Navbar
