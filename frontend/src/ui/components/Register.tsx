import chrome from "../../assets/chrome.svg"



export const Register=()=>{
    return(
        <div className=" space-y-8">
            <div className=" space-y-2 text-center text-white">
                <div className=" text-3xl font-bold tracking-tighter ">New Here ?</div>
                <div className=" text-gray-400">Register yourself</div>
            </div>
            <button className=" p-2 w-full h-12 border-2 border-gray-800 rounded-full hover:bg-gray-600 flex justify-center" onClick={()=>{

            }}>
                <div className=" text-white  flex justify-center gap-6">
                    <img src={chrome} alt="" className=" w-7" />
                    Signup with google
                </div>
            </button>
            <div className=" flex justify-center items-center">
                <div className=" bg-white h-px w-28"></div>
                <div className=" px-2 text-gray-400">Or continue with</div>
                <div className=" bg-white h-px w-28"></div>
            </div>
            <div className=" flex justify-start flex-col items-start space-y-4 w-full ">
                <div className=" flex space-y-2 text-white flex-col w-full">
                    <label htmlFor="" className=" text-white font-medium text-md">Email:-</label>
                    <input type="text"  placeholder="example@domain....." className=" h-12 bg-gray-00 text-gray-950 rounded-xl w-full px-2 border-none focus:border-none"/>
                </div>
                <div className=" flex space-y-2 text-white flex-col w-full">
                    <label htmlFor="" className=" text-white font-medium text-md">Password:-</label>
                    <input type="password"  placeholder="*******" className=" h-12 bg-gray-00 text-gray-950 rounded-xl w-full px-2 border-none focus:border-none"/>
                </div>
                <button className=" w-full h-12 bg-gray-900 text-white hover:bg-black rounded-full">Signup</button>
            </div>
        </div>
    )
}