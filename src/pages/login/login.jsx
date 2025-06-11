import { useState } from "react"
import "./login.css"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin(
        {
            onSuccess: (res) => {
                console.log(res);
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
                    accessToken: res.access_token
                }).then((res) => {
                    console.log(res)
                    toast.success("Login Success")
                    const user = res.data.user
                    localStorage.setItem("token", res.data.token)
                    if (user.role === "admin") {
                        navigate("/admin/")
                    } else {
                        navigate("/")
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    )

    function goToRegister() {
        navigate("/register")
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        console.log(email, password)
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        axios.post(`${backendUrl}/api/users/login`,
            {
                email: email,
                password: password
            }
        ).then((res) => {
            console.log(res);
            toast.success('Login Successfull')
            const user = res.data.user
            localStorage.setItem("token", res.data.token)

            if (user.emailVerified == false) {
                navigate("/verify-email")
                return;
            }

            if (user.role === "admin") {
                navigate("/admin/")
            } else {
                navigate("/")
            }

        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.error)
        })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-picture">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[300px] p-1 h-[400px] md:w-[400px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative bg-white/15">

                    <img src="/logo2.png" alt="logo" className="w-[150px] h-[150px] top-1 object-cover" />

                    <input type="email" placeholder="Email" className="mt-4 w-[250px] md:w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={email} onChange={
                        (e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <input type="password" placeholder="Password" className="mt-6 w-[250px] md:w-[300px] h-[30px] text-white bg-transparent border-b-2 border-white text-xl outline-none" value={password} onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }
                    } />

                    <button className="mt-10  w-[250px] md:w-[300px] h-[50px] bg-[#CA7842] text-white rounded-lg">Login</button>
                    <button onClick={googleLogin} className="my-2 w-[250px] md:w-[300px] h-[50px] bg-[#CA7842] text-white rounded-lg">Login With Google</button>
                    <button onClick={goToRegister} className="mb-2 w-[250px] md:w-[300px] h-[50px] bg-[#CA7842] text-white rounded-lg">Register Here</button>
                </div>
            </form>
        </div>
    )
}