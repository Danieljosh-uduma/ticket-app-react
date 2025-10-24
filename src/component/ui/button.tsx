import type { MouseEventHandler, ReactNode } from "react"

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
