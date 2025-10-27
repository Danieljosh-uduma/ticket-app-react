import { useEffect, useState } from "react";
import { Button } from "./button";
import { Input, TextArea } from "./input";
import { createToken } from "../../server/token";
import { useNavigate } from "react-router";
import { createTicket, editTicketById, getTicketById, Login, SignUp } from "../../services/api";
import type { ticketType, userData } from "../../services/types";

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
    const [error, setError] = useState(false)


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
        
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validName && validEmail && validPhoneNumber && validPassword) {
            const userdata: userData = {
                fullname: fullname,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            }
            SignUp(userdata).then(res => {
                if (res.user) {
                    setError(false)
                    setMessage("successfully signed up")
                    localStorage.setItem("userdata", JSON.stringify(res.user))
                    localStorage.setItem("ticketapp_session", generateToken())
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 1000)
                    console.log(res)
                } else {
                    setError(true)
                    setMessage("something went wrong")
                    setTimeout(() => {
                        setMessage("")
                    }, 2000)
                }
            })
        }
    }
    
    

    return (
        <form action="" className="container flex flex-col gap-4 relative w-full z-50 overflow-hidden" onSubmit={handleSubmit}>
            <div className={`border-l-4 ${error? "border-l-red-400": "border-l-teal-400"} shadow-md relative transition-all duration-300 ease-in ${message? "opacity-100 left-0": "opacity-0 left-[50%]"} px-4 py-2 rounded-lg`}>
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
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
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
    const token = localStorage.getItem("ticketapp_session")
    if (token) {
        navigate("/dashboard")
    }
    // const [error, setError] = useState("")

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
            Login(userdata).then(res => {
                if (res.user) {
                    localStorage.setItem("userdata", JSON.stringify(res.user))
                    localStorage.setItem("ticketapp_session", createToken(res.user.fullname, res.user.email))
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 1000)
                }}
            )

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
                required={true}
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
                required={true}
            />

            <Button type="submit" isLoading={false} className="bg-[#0066FF] text-white py-2.5 w-1/3 mx-auto rounded-3xl font-bold">Login</Button>
        </form>
    )
}

export function CreateTicketForm({closeModal}: {closeModal: (value: boolean) => void}) {
    const navigate = useNavigate()
    // const [stat, title] = ["status", "title"]
    const [title, setTitle] = useState("")
    const [stat, setStat] = useState("")
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState("")

    const [validTitle, setValidTitle] = useState(true)
    const [validStat, setValidStat] = useState(true)
    const [validPriority, setValidPriority] = useState(true)
    const [validDescription, setValidDescription] = useState(true)


    const validateTitle = (title: string) => title.length >= 3? setValidTitle(true): setValidTitle(false)
    const validateStat = (stat: string) => stat.toLowerCase() === "open" || stat.toLowerCase() === "closed" || stat.toLowerCase() === "pending"? setValidStat(true): setValidStat(false)
    const validateDescription = (description: string) => description.length >= 3? setValidDescription(true): setValidDescription(false)
    const validatePriority = (priority: string) => priority.toLowerCase() === "high" || priority.toLowerCase() === "medium" || priority.toLowerCase() === "low"? setValidPriority(true): setValidPriority(false)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validTitle && validStat && validDescription && validPriority) {
            const ticketdata: ticketType = {
                title: title,
                status: stat,
                priority: priority,
                description: description
            } 
            createTicket(ticketdata).then(res => console.log(res))
            setMessage("successfully created ticket")
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
                name="title" 
                label="Title *" 
                placeholder="johndoe@gmail.com"
                type="text" 
                value={title} 
                onChange={(e) => {setTitle(e.target.value); validateTitle(e.target.value)}} 
                isValid={validTitle}
                message="Title should have at least 3 characters"
                required={true}
            />
            <Input
                name="status"
                label="Status *"
                placeholder="status"
                type="text"
                value={stat}
                onChange={(e) => {setStat(e.target.value); validateStat(e.target.value)}}
                isValid={validStat}
                message="status should be open, closed or pending"
                required={true}
            />
            <Input
                name="priority"
                label="Priority"
                placeholder="priority"
                type="text"
                value={priority}
                onChange={(e) => {setPriority(e.target.value); validatePriority(e.target.value)}}
                isValid={validPriority}
                message="priority should be high, medium or low"
                required={false}
            />
            <TextArea
                name="description"
                label="Description"
                placeholder="description"
                value={description}
                onChange={(e) => {setDescription(e.target.value); validateDescription(e.target.value)}}
                isValid={validDescription}
                message="description should have at least 3 characters"
                required={false}
            />
            <div className="flex justify-center">
                <Button 
                    type="submit" 
                    isLoading={false} 
                    className="bg-[#0066FF] text-white py-2.5 w-1/3 mx-auto rounded-3xl font-bold"
                >Create ticket</Button>
                <Button 
                    type="button" 
                    isLoading={false} 
                    onClick={() => closeModal(false)} 
                    className="text-[#0066FF] border border-[#0066FF] hover:bg-[#0066FF] hover:text-white bg-white py-2.5 w-1/3 mx-auto rounded-3xl font-bold"
                >Cancel</Button>
            </div>
        </form>
    )
}

export function EditTicketForm({closeModal, id}: {id: number, closeModal: (value: boolean) => void}) {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [stat, setStat] = useState("")
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState("")

    const [validTitle, setValidTitle] = useState(true)
    const [validStat, setValidStat] = useState(true)
    const [validPriority, setValidPriority] = useState(true)
    const [validDescription, setValidDescription] = useState(true)


    const validateTitle = (title: string) => title.length >= 3? setValidTitle(true): setValidTitle(false)
    const validateStat = (stat: string) => stat.toLowerCase() === "open" || stat.toLowerCase() === "closed" || stat.toLowerCase() === "pending"? setValidStat(true): setValidStat(false)
    const validateDescription = (description: string) => description.length >= 3? setValidDescription(true): setValidDescription(false)
    const validatePriority = (priority: string) => priority.toLowerCase() === "high" || priority.toLowerCase() === "medium" || priority.toLowerCase() === "low"? setValidPriority(true): setValidPriority(false)

    useEffect(() => {
        getTicketById(id).then(res => {
            if (res) {
                console.log(res.ticket)
                setTitle(res.ticket.title)
                setStat(res.ticket.status)
                setPriority(res.ticket.priority)
                setDescription(res.ticket.description)
            }
        })
    }, [id])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validTitle && validStat && validDescription && validPriority) {
            const ticketdata: ticketType = {
                title: title,
                status: stat,
                priority: priority,
                description: description
            }
            editTicketById(ticketdata, id).then(res => console.log(res))
            setMessage("successfully edited ticket")
            navigate("/dashboard")
        }
    }
    

    return (
        <form action="" className="container flex flex-col gap-4 relative w-full z-50 overflow-hidden" onSubmit={handleSubmit}>
            <div className={`border-l-4 border-l-teal-400 shadow-md text-teal-700 relative transition-all duration-300 ease-in ${message? "opacity-100 left-0": "opacity-0 left-[50%]"} px-4 py-2 rounded-lg`}>
                {message}
            </div>

            <Input 
                name="title" 
                label="Title *" 
                placeholder="johndoe@gmail.com"
                type="text" 
                value={title} 
                onChange={(e) => {setTitle(e.target.value); validateTitle(e.target.value)}} 
                isValid={validTitle}
                message="Title should have at least 3 characters"
                required={true}
            />
            <Input
                name="status"
                label="Status *"
                placeholder="status"
                type="text"
                value={stat}
                onChange={(e) => {setStat(e.target.value); validateStat(e.target.value)}}
                isValid={validStat}
                message="status should be open, closed or pending"
                required={true}
            />
            <Input
                name="priority"
                label="Priority"
                placeholder="priority"
                type="text"
                value={priority}
                onChange={(e) => {setPriority(e.target.value); validatePriority(e.target.value)}}
                isValid={validPriority}
                message="priority should be high, medium or low"
                required={false}
            />
            <TextArea
                name="description"
                label="Description"
                placeholder="description"
                value={description}
                onChange={(e) => {setDescription(e.target.value); validateDescription(e.target.value)}}
                isValid={validDescription}
                message="description should have at least 3 characters"
                required={false}
            />
            <div className="flex justify-center">
                <Button 
                    type="submit" 
                    isLoading={false} 
                    className="bg-[#0066FF] text-white py-2.5 w-1/3 mx-auto rounded-3xl font-bold"
                >Save ticket</Button>
                <Button 
                    type="button" 
                    isLoading={false} 
                    onClick={() => closeModal(false)} 
                    className="text-[#0066FF] border border-[#0066FF] hover:bg-[#0066FF] hover:text-white bg-white py-2.5 w-1/3 mx-auto rounded-3xl font-bold"
                >Cancel</Button>
            </div>
        </form>
    )
}