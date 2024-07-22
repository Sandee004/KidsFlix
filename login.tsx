import { useNavigate } from "react-router-dom";
import React, { useState } from "react"


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const submitForm = async(e:React.FormEvent) => {
        e.preventDefault()

        const data = {
            email,
            password,
        }
        //const url = 'http://localhost:5000/login'
        const url = 'https://signup-api-l42o.onrender.com/login'

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
              const errorData = await response.json();
              const errorMessage = errorData.message || "Login failed"; // Handle potential missing message property
              alert(errorMessage);
            } else {
                navigate("/")
            }
          } catch (error) {
            console.error(error);
            alert("An error occurred during login");
          }
    }


    return (
        <>
        <p className="font-bold text-2xl text-center my-10">Login</p>

        <form className="flex flex-col justify-center items-center" onSubmit={submitForm}>
            <input
            placeholder="Email"
            className="border-black italic  border-2 rounded-sm px-5 py-2 w-[80%] my-2 "
                type='email'
                id='email'
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                />

            <input
            placeholder="Password"
            className="border-black italic border-2 rounded-sm px-5 py-2 w-[80%] my-2 sm:w-[60%]"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            />

            <button className="bg-green-400 w-[80%] py-2 rounded-sm hover:bg-green-600 font-bold mt-2" type="submit">Login</button>
        </form>
        </>
    )
}

export default Login