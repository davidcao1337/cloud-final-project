import React, { useState } from "react"
import "./login.css"
import cloudLogo from "../../assets/clouds.png"
import { useNavigate } from "react-router-dom"
// import { useLogin } from "../../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const {login, error, isLoading} = useLogin();

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/register'
        navigate(path);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // TODO
        console.log("Submitted!")
        // await login(email, password);
    }

    return(
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <img className="mt-24 mb-10" src={cloudLogo} alt="" height="250" width="250" />
            <h2 className="mb-10 font-bold text-3xl text-[#525252]">Login to your Account</h2>
            <div className="auth-form-container w-1/4">
                <form onSubmit={handleSubmit}>
                    <div className="email-container text-left text-[#828282]">
                        <label className="font-semibold" htlmfor="email">Email</label>
                        <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                    </div>
                    <div className="password-container text-left text-[#828282]"> 
                        <label className="font-semibold" htlmfor="password">Password</label>
                        <input className="border-2 w-full rounded-[5px] px-2 py-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" />
                    </div>
                    <button className="mt-10 mb-24 w-full font-extrabold text-lg text-white bg-sky-500 rounded-[6px] px-16 py-3" type="submit">Log In</button>
                </form>
                <div className="mt-10 mb-10">
                    <p className="text-[#828282]">Not registered yet?</p>
                    <button className="text-semibold text-sky-500" onClick={routeChange}>Create an account</button>
                </div>
            </div>
        </div>
    )
}

export default Login