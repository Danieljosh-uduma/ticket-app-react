import { Image } from "./image"
import Logo from "../../assets/images/transparent-black-logo.png"
import { Link, useNavigate } from "react-router"


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