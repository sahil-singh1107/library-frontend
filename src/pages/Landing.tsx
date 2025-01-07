import Navbar from "@/components/Navbar"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Landing = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard")
    }
  }, [])

  return (
    <div className="relative bg-[#010100] h-screen text-center">
      <Navbar />
      <div className="mt-12 flex flex-col relative z-10">
        <div className="text-white text-center font-bold text-6xl font-title2 space-x-2">
          <span className="fade-in delay-1 inline-block torch-text">Borrow</span>
          <span className="fade-in delay-2 inline-block torch-text">and</span>
          <span className="fade-in delay-3 inline-block torch-text">read</span>
          <span className="fade-in delay-4 inline-block torch-text">books</span>
          <span className="fade-in delay-5 inline-block torch-text">easily</span>
        </div>
        <span className="text-[#d1d0d0] mt-4 text-xl font-light font-title2">Best website for reading books</span>
      </div>
    </div>
  )
}

export default Landing
