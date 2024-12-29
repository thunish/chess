import { useNavigate } from "react-router-dom"


export const Landing=()=>{
    const navigate=useNavigate();
    return(
        <div className=" bg-black h-screen flex justify-center items-center p-4">
            <div className="">
                <button onClick={()=>{
                    if(localStorage.getItem('token')){
                        navigate('/game');
                    }
                    else{
                        navigate('/auth')
                    }
                }} className=" w-full h-full bg-slate-500 text-white rounded-lg p-4 text-3xl font-semibold">Play Now!</button>
            </div>
        </div>
    )
}