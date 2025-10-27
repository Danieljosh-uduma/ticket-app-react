import type { MouseEventHandler, ReactNode } from "react"
import { useNavigate } from "react-router"

type ButtonProp = {
    children: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    type?: "button" | "submit" | "reset"
    className?: string
    isLoading?: boolean
}

export function Button({children, onClick, type="button", className, isLoading}: ButtonProp) {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={className}
        >
            {isLoading? <span className="loader"></span> : children}
        </button>
    )
}

export function LogoutButton() {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.removeItem("ticketapp_session")
        navigate("/")
    }
    return (
        <Button 
            type="button" 
            className="py-3 px-4 text-[#e7008a] border border-[#e7008a] hover:bg-[#e7008a] hover:text-white bg-white font-bold active:scale-80 transition-all duration-200 rounded-3xl flex items-center gap-2 w-full"
            onClick={handleClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Log out
        </Button>
    )
}