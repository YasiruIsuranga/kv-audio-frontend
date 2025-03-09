import { useState } from "react"
import "./login.css"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    const[email,setEmail] = useState("");
    const[password,setPassword] =  useState("");
    const navigate = useNavigate()

    function handleOnSubmit(e){
        e.preventDefault()
        console.log(email,password)
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        axios.post(`${backendUrl}/api/users/login`,
            {
                email : email,
                password : password     
            }
        ).then((res)=>{
            console.log(res);
            toast.success('Login Successfull')

            const user = res.data.user
            localStorage.setItem("token",res.data.token)

            if(user.role === "admin"){
                navigate("/admin/")
            }else{
                navigate("/")
            }

        }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
        })
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-picture">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative">
                    
                    <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] top-1 object-cover" />
                    
                    <input type="email" placeholder="Email" className="mt-6 w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={email} onChange={
                        (e)=>{
                            setEmail(e.target.value);
                        }} 
                    />
                    
                    <input type="password" placeholder="Password" className="mt-6 w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={password} onChange={
                        (e)=>{
                            setPassword(e.target.value);
                        }
                    }/>

                    <button className="my-8 w-[300px] h-[50px] bg-[#efac38] text-white rounded-lg">Login</button>
                </div>
            </form>
        </div>
    )
}