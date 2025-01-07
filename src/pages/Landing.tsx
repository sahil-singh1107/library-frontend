import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }

    const handleMouseMove = (e : any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [navigate]);

  return (
    <div
      className="relative bg-dotted-infinite h-screen text-center"
      style={{
        backgroundPosition: `${mousePosition.x / 10}px ${mousePosition.y / 10}px`,
      }}
    >
      <Navbar />
      <div className="mt-12 flex flex-col relative z-10">
        <div className="text-white text-center font-bold text-6xl font-title2 space-x-2">
          <span className="fade-in delay-1 inline-block torch-text glow-on-hover">
            Borrow
          </span>
          <span className="fade-in delay-2 inline-block torch-text glow-on-hover">
            and
          </span>
          <span className="fade-in delay-3 inline-block torch-text glow-on-hover">
            read
          </span>
          <span className="fade-in delay-4 inline-block torch-text glow-on-hover">
            books
          </span>
          <span className="fade-in delay-5 inline-block torch-text glow-on-hover">
            easily
          </span>
        </div>
        <span className="text-[#d1d0d0] mt-4 text-xl font-light font-title2">
          Best website for reading books
        </span>
      </div>
    </div>
  );
};

export default Landing;
