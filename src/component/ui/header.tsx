import { Image } from "./image"
import Logo from "../../assets/images/transparent-black-logo.png"
import { Link, useNavigate } from "react-router"
import { SideBar } from "./sidebar"
import { useState } from "react"


export function Header({link, title}: {link: string, title: string}) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }

    return (
        <header className="w-full h-25 flex justify-between items-center px-4 md:px-8 lg:px-12">
            <Image 
                src={Logo}
                alt="Ticket ease logo"
                className="w-32 md:w-40 h-auto"
                onClick={handleClick}
            />
            <Link to={link} className="text-base md:text-lg font-semibold bg-[#e7008a] text-white rounded px-4 py-2 md:px-5 md:py-2.5">
                {title}
            </Link>
        </header>
    )
}

export function DashboardHeader({title}: {title: string}) {
    const [show, setShow] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }


    return (
        <>
            {show && <SideBar className="md:hidden pb-20"/>}
            <header className="h-20 w-full shadow-lg flex justify-between px-8 items-center sticky top-0 right-0 bg-white z-50">
                <h3 className="text-2xl">{title}</h3>
                <div className="md:hidden" onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </header>
        </>
    )
}