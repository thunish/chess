import { useState } from "react"
import { Login } from "../components/Login";
import { Register } from "../components/Register";



export const LoginPage=()=>{
    const [activeTab, setActiveTab]=useState<'signup' | 'signin'>('signin');

    return(
        <div className=" flex justify-center items-center w-full min-h-screen bg-gray-950">
            <div className=" flex flex-col items-center w-full space-y-8 py-4 max-w-md px-10 border-gray-400 border rounded-2xl bg-slate-1000">
                <div className=" bg-gray-600 flex space-x-4 p-2 rounded-full shadow-lg w-full">
                    <button className={
                        `px-6 py-2 rounded-full font-medium transition-all w-1/2 ${
                            activeTab==='signin'
                            ? "bg-white text-black shadow-lg"
                            : " bg-transparent text-gray-300 hover:bg-gray-700"
                        }`
                    } onClick={()=>{
                        setActiveTab('signin')
                    }}>Login</button>
                    <button className={
                        `px-6 py-2 rounded-full font-medium transition-all w-1/2 ${
                            activeTab==='signup'
                            ? "bg-white text-black shadow-lg"
                            : " bg-transparent text-gray-300 hover:bg-gray-700"
                        }`
                    } onClick={()=>{
                        setActiveTab('signup')
                    }}>Resgiter</button>
                </div>
                {activeTab==='signin' && <Login></Login>}
                {activeTab==='signup' && <Register></Register>}
            </div>
        </div>
        
    )
}