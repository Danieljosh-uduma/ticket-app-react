import { Image } from "./image"
import { LogoutButton } from "./button"
import Logo from "../../assets/images/transparent-black-logo.png"
import { Link, useLocation, useNavigate } from "react-router"
import type { JSX } from "react"


export function SideBar({className}: {className?: string}) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }
    return (
        <aside className={`w-60 h-screen md:flex flex-col gap-10 fixed shadow bg-white z-100 ${className}`} aria-labelledby="side-bar">
            <div className="h-20 flex justify-start pl-8 items-center">
                <Image 
                    src={Logo}
                    alt="Ticket ease logo"
                    className="w-20 md:w-32 h-auto"
                    onClick={handleClick}
                />
            </div>
            <NavList />
        </aside>
    )
}


function NavList() {    
    return (
        <nav className="px-4 flex justify-between flex-col h-full pb-10">
            <ul className="flex flex-col gap-4">
                <NavItem 
                    title="Dashboard"
                    url="/dashboard"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    }
                />
                <NavItem 
                    title="Tickets"
                    url="/tickets"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h1.5M9 9h1.5M9 12h1.5M9 15h1.5M15 6H9a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3V9a3 3 0 00-3-3z" />
                        </svg>
                    }
                />
            </ul>
            <LogoutButton />
        </nav>
    )
}

function NavItem({title, url, icon}: {title: string, url: string, icon: JSX.Element}) {
    const location = useLocation()

    return (
        <li>
            <Link 
                to={url} 
                className={`py-3 px-3 rounded-3xl shadow-lg hover:bg-[#cfdff7] flex items-center gap-2 ${location.pathname.includes(url)? "bg-[#cfdff7]": ""}`}
            >
                {icon}
                {title}
            </Link>
        </li>
    )
}

