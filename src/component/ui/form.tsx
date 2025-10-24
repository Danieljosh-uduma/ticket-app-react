import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { createToken } from "../../server/token";
import { useNavigate } from "react-router";


export function SignupForm() {
    const navigate = useNavigate()
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [validName, setValidName] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [validPhoneNumber, setValidPhoneNumber] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [message, setMessage] = useState("")


    const validateName = (fullname: string) => {
        if (fullname.length > 0 && fullname.match("[a-zA-Z]+ [a-zA-Z]+")) {
            setValidName(true)
        } else {
            setValidName(false)
        }
    }
    const validateEmail = (email: string) => {
        if (email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }
    const validateNumber = (phoneNumber: string) => {
        if (phoneNumber.length > 0 && phoneNumber.match("[0-9]+") &&  phoneNumber.length === 11 && !isNaN(Number(phoneNumber))
 ) {
            setValidPhoneNumber(true)
        } else {
            setValidPhoneNumber(false)
        }
    }
    const validatePassword = (password: string) => {
        if (password.length > 0 && password.length >= 8) {
            setValidPassword(true)
        } else {
            setValidPassword(false)
        }
    }
    const generateToken = () => createToken(fullname, email)
    // console.log(decodeToken(generateToken()))
        
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validName && validEmail && validPhoneNumber && validPassword) {
            setMessage("successfully signed up")
            const userdata = {
                fullname: fullname,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            }
            localStorage.setItem("userdata", JSON.stringify(userdata))
            localStorage.setItem("token", generateToken())

            setTimeout(() => {
                navigate("/dashboard")
            }, 1000)
        }
    }
    
    

    return (
        <form action="" className="container flex flex-col gap-4 relative w-full z-50 overflow-hidden" onSubmit={handleSubmit}>
            <div className={`border-l-4 border-l-teal-400 shadow-md text-teal-700 relative transition-all duration-300 ease-in ${message? "opacity-100 left-0": "opacity-0 left-[50%]"} px-4 py-2 rounded-lg`}>
                {message}
            </div>
            <Input 
                name="fullname" 
                label="Full Name" 
                placeholder="John Doe" 
                type="text" 
                value={fullname} 
                onChange={(e) => {setFullname(e.target.value); validateName(e.target.value)}} 
                isValid={validName}
                message="enter valid name (i.e Firstname Lastname)"
            />

            <Input 
                name="email" 
                label="Email" 
                placeholder="johndoe@gmail.com"
                type="email" 
                value={email} 
                onChange={(e) => {setEmail(e.target.value); validateEmail(e.target.value)}} 
                isValid={validEmail}
                message="enter vaild email (i.e johndoe.example.com)"
            />

            <Input
                name="phoneNumber"
                label="Phone Number"
                placeholder="+234"
                type="tel"
                value={phoneNumber}
                onChange={(e) => {setPhoneNumber(e.target.value); validateNumber(e.target.value)}}
                isValid={validPhoneNumber}
                message="enter valid number (i.e 08012345678)"
            />

            <Input
                name="password"
                label="Password"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); validatePassword(e.target.value)}}
                isValid={validPassword}
                message="password must have 8 or more characters"
            />

            <Button type="submit" isLoading={false} className="bg-[#0066FF] text-white py-2.5 w-1/3 mx-auto rounded-3xl font-bold">Sign up</Button>
        </form>
    )
}


export function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [validEmail, setValidEmail] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [error, setError] = useState("")

    const validateEmail = (email: string) => {
        if (email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }
    const validatePassword = (password: string) => {
        if (password.length > 0 && password.length >= 8) {
            setValidPassword(true)
        } else {
            setValidPassword(false)
        }
    }
        
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validEmail && validPassword) {
            setMessage("successfully signed up")
            const userdata = {
                email: email,
                password: password
            }
            localStorage.setItem("userdata", JSON.stringify(userdata))

            setTimeout(() => {
                navigate("/dashboard")
            }, 1000)
        }
    }
    
    

    return (
        <form action="" className="container flex flex-col gap-4 relative w-full z-50 overflow-hidden" onSubmit={handleSubmit}>
            <div className={`border-l-4 border-l-teal-400 shadow-md text-teal-700 relative transition-all duration-300 ease-in ${message? "opacity-100 left-0": "opacity-0 left-[50%]"} px-4 py-2 rounded-lg`}>
                {message}
            </div>

            <Input 
                name="email" 
                label="Email" 
                placeholder="johndoe@gmail.com"
                type="email" 
                value={email} 
                onChange={(e) => {setEmail(e.target.value); validateEmail(e.target.value)}} 
                isValid={validEmail}
                message="enter vaild email (i.e johndoe.example.com)"
            />
            <Input
                name="password"
                label="Password"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); validatePassword(e.target.value)}}
                isValid={validPassword}
                message="password must have 8 or more characters"
            />

            <Button type="submit" isLoading={false} className="bg-[#0066FF] text-white py-2.5 w-1/3 mx-auto rounded-3xl font-bold">Sign up</Button>
        </form>
    )
}