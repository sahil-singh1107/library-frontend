import Display from "@/components/Display"
import Sidebar from "@/components/Sidebar"
import { emailState, tokenState } from "@/store/atoms/atoms"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

const DashBoard = () => {

    const [token, setToken] = useRecoilState(tokenState)
    const [email, setEmail] = useRecoilState(emailState)

    const navigate = useNavigate()

    useEffect(() => {

      const getToken = localStorage.getItem("token")
      const getEmail = localStorage.getItem("email")
        if (getToken && getEmail) {
            setToken(getToken)
            setEmail(getEmail)
        }   
        else navigate("/");
    },[])

  return (
    <div className="bg-[#010100] w-full flex ">
        <Sidebar  />
        <Display  />
    </div>
  )
}

export default DashBoard
