import { useEffect, useState } from "react";
import { SideBar, DashboardHeader, CreateTicketModal, TicketsList} from "../component";
import { useNavigate } from "react-router";



export default function TicketPage() {
    const [showModal, setShowModal] = useState(false)
    const token = localStorage.getItem("ticketapp_session")
    const navigate = useNavigate()

    useEffect(() => {
            if (token === null) {
                navigate("/auth")
            }
        }, [token, navigate])

    return (
        <>
            <SideBar className="hidden" />
            <main className="w-full md:w-[calc(100%-240px)] h-screen md:ml-60">
                <DashboardHeader title="Tickets"/>

                <TicketsList openModal={setShowModal} />
                {showModal && <CreateTicketModal closeModal={setShowModal}/>}
                

            </main>
        </>
    )
}