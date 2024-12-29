import  { Routes, BrowserRouter, Route } from "react-router-dom"
import { Landing } from "./ui/pages/Landing"
import { Game } from "./ui/pages/Game"
import { LoginPage } from "./ui/pages/LoginPage"
import { Login } from "./ui/components/Login"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<Game></Game>}></Route>
          <Route path="/*" element={<Landing></Landing>}></Route>
          <Route path="/auth" element={<LoginPage></LoginPage>}></Route>
          <Route path="/log" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
