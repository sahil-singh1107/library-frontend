import Display from "@/components/Display"
import Sidebar from "@/components/Sidebar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const DashBoard = () => {

    const [token, setToken] = useState<string | null>()
    const [email, setEmail] = useState<string | null>()

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            setEmail(localStorage.getItem("email"))
        }   
        else navigate("/");
    },[])

  return (
    <div className="h-screen bg-[#010100] w-full flex ">
        <Sidebar email={email} />
        <Display/>
    </div>
  )
}

export default DashBoard
