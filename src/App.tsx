import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Admin from "./pages/Admin";
import DashBoard from "./pages/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
