import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            username,
            email,
        };
        const url = "http://localhost:5000/api/register";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const error = await response.json();
                const errorMessage = error.message || "Signup failed";
                alert(errorMessage);
                return;
            }

            const loginResponse = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email }),
            });

            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                localStorage.setItem('token', loginData.access_token);
                navigate("/");
            } else {
                alert("Signup successful, but auto-login failed. Please log in manually.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error submitting signup:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };
    return (
        <>
            <p>Register</p>

            <form
                className="flex flex-col justify-center items-center"
                onSubmit={submitForm}>
                <input
                    placeholder="Username"
                    className="border-black italic  border-2 rounded-sm px-5 py-2 w-[80%] my-2 sm:w-[60%]"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />

                <input
                    placeholder="Email"
                    className="border-black italic  border-2 rounded-sm px-5 py-2 w-[80%] my-2 sm:w-[60%]"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />

                <button
                    className="bg-green-400 w-[80%] py-2 rounded-sm hover:bg-green-600 font-bold mt-2"
                    type="submit">
                    SignUp
                </button>
            </form>
        </>
    );
};

export default RegisterPage;


