import { useEffect, useState } from "react"
import { Button } from "./button"
import { MenuTicketModal } from "./modal"
import { getTicket } from "../../services/api"
import { useNavigate } from "react-router"
import { EditTicketForm } from "./form"

export function RecentTickets() {
    const [tickets, setTickets] = useState<ticket[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        getTicket().then(res => setTickets(res.tickets))
    }, [])
    const toggleShow = (id: number) => {
        setTickets(tickets.map(ticket => {
            if (ticket.id === id) {
                return {...ticket, show: !ticket.show}
            }
            return ticket
        }))
    }

    return (
        <section aria-labelledby="recent-ticket">
            <div className="p-10">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recent Tickets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.reverse().slice(0, 3).map(ticket => <RecentTicketCard 
                        key={ticket.id} 
                        id={ticket.id}
                        title={ticket.title} 
                        description={ticket.description}
                        priority={ticket.priority}
                        status={ticket.status}
                        showMenu={() => toggleShow(ticket.id)}
                        menu={ticket.show}
                        openEditModal={() => navigate("/tickets")}
                        />
                    )}
                    
                </div>
            </div>
        </section>
    )
}

export function RecentTicketCard(
    {
        id,
        title, 
        description, 
        priority, 
        status, 
        menu, 
        showMenu,
    }: {
        id: number,
        title: string, 
        description: string, 
        priority: string, 
        status: string, 
        menu: boolean, 
        showMenu: () => void,
        openEditModal: () => void}
) {
    const [showModal, setShowModal] = useState(false)
    const priorityColor = priority === "high" ? "text-red-600": priority === "medium" ? "text-blue-600" : "text-orange-600"
    const statusColor = status === "open" ? "text-teal-600": status === "closed" ? "text-gray-600" : "text-amber-600"

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center relative">
                <h2 className="text-xl font-medium text-gray-700 mb-2">{title}</h2>
                <span>
                    <Button type="button" onClick={showMenu} className="w-6 h-6 flex justify-center items-center rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="true" aria-haspopup="true">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </Button>
                    {showModal && 
                        <div className="fixed top-0 left-0 overflow-hidden w-screen h-screen z-1000 bg-[#0000005f]">
                            <div className="absolute overflow-hidden top-20 left-5 right-10 sm:left-20 sm:right-20 md:left-[20%] md:right-[20%] xl:left-[30%] xl:right-[30%] rounded-3xl shadow-lg bg-white opacity-100 p-10 z-1001">
                                <h2 className="text-3xl font-semibold text-gray-800">Edit Ticket</h2>
                                <EditTicketForm closeModal={setShowModal} id={id}/>
                            </div>
                        </div>
                    }

                    {menu && <MenuTicketModal openModal={setShowModal} id={id} />}
                </span>
            </div>
            <p className="text-gray-600 mb-4">"{description}"</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Priority: <span className={`font-semibold ${priorityColor}`}>{priority}</span></span>
                <span>Status: <span className={`font-semibold ${statusColor}`}>{status}</span></span>
            </div>
        </div>
    )
}

export type ticket = {
    id: number
    title: string
    description: string
    priority: string
    status: string
    show: boolean
}
export function TicketsList({openModal}: {openModal: (value: boolean) => void}) {
    const [TicketsList, setTicketsList] = useState<ticket[]>([])
    useEffect(() => {
        getTicket().then(res => setTicketsList(res.tickets))
    }, [])
    const toggleShow = (id: number) => {
        setTicketsList(TicketsList.map(ticket => {
            if (ticket.id === id) {
                return {...ticket, show: !ticket.show}
            }
            return ticket
        }))
    }

    return (
        <section className="p-10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800">My Tickets</h2>
                    <p>you have open tickets (2 total)</p>
                </div>
                <Button 
                    type="button" 
                    children="Create Ticket" 
                    onClick={() => openModal(true)}
                    className="bg-[#0066FF] text-white px-4 py-2 rounded-lg"
                    />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TicketsList.reverse().map(ticket => <RecentTicketCard 
                    key={ticket.id} 
                    id={ticket.id}
                    title={ticket.title} 
                    description={ticket.description} 
                    priority={ticket.priority} 
                    status={ticket.status}
                    menu={ticket.show}
                    showMenu={() => toggleShow(ticket.id)}
                    openEditModal={() => {}}
                    />)}
            </div>
                
        </section>
    )
}