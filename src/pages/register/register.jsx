import { useState } from "react";
import "./register.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(email, password, firstName, lastName, address, phone);
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
            email : email,
            firstName : firstName,
            lastName : lastName,
            password : password,
            address : address,
            phone : phone
        }).then((res)=>{
            toast.success("Registration Success")
            navigate("/login")
        }).catch((err)=>{
            toast.error(err?.response?.data?.error || "An error occured")
        })
    }

    function goToLogin() {
        navigate("/login")
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-picture">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[300px] md:w-[400px] h-[500px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative bg-white/15">
                    <img src="/logo2.png" alt="logo" className="w-[100px] h-[100px] top-1 object-cover" />

                    <input type="text" placeholder="First Name" className="mt-5 w-[250px] md:w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <input type="text" placeholder="Last Name" className="mt-4 w-[250px] md:w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <input type="email" placeholder="Email" className="mt-4 w-[250px] md:w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder="Password" className="mt-4 w-[250px] md:w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <input type="text" placeholder="Address" className="mt-4 w-[250px] md:w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={address} onChange={(e) => setAddress(e.target.value)} />

                    <input type="text" placeholder="Phone" className="mt-4 w-[250px] md:w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <button className="my-2 w-[250px] md:w-[300px] h-[40px] bg-[#CA7842] text-white rounded-lg" >Register</button>
                    <button onClick={goToLogin} className="my-2 w-[250px] md:w-[300px] h-[40px] bg-[#CA7842] text-white rounded-lg" >Alredy Have a Account</button>
                </div>
            </form>
        </div>
    );
}
