import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hooks";
import { useNavigate } from "react-router";
import { getTicket } from "../../services/api";
import type { ticket } from "./recents";

export function Overview() {
    const userDataString = localStorage.getItem("userdata");
    const user = userDataString ? JSON.parse(userDataString) : null;
    const token = useContext(AuthContext)
    const navigate = useNavigate()
    const [tickets, setTickets] = useState<ticket[]>([]) 

    useEffect(() => {
        if (token === null) {
            navigate("/auth")
        }
    }, [token, navigate])

    useEffect(() => {
        getTicket().then(res => setTickets(res.tickets))
    }, [])

    return (
        <section aria-labelledby="Dashboard-overview">
            <div className="p-10">
                <h2 className="text-3xl font-semibold text-gray-800">Welcome, {user?.fullname}!</h2>
                <p className="mb-6">Here's is what's happening with your tickets</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TicketCard 
                        title="Total Tickets"
                        value={tickets.length}
                        textColor="text-[#e7008a]"
                    />
                    <TicketCard 
                        title="Open Tickets"
                        value={tickets.filter(ticket => ticket.status === "open").length}
                        textColor="text-blue-600"
                    />
                    <TicketCard 
                        title="Closed Tickets"
                        value={tickets.filter(ticket => ticket.status === "closed").length}
                        textColor="text-green-600"
                    />
                    <TicketCard 
                        title="In Progress Tickets"
                        value={tickets.filter(ticket => ticket.status === "pending").length}
                        textColor="text-red-600"
                    />
                    <TicketCard 
                        title="High Priority"
                        value={tickets.filter(ticket => ticket.priority === "high").length}
                        textColor="text-yellow-600"
                    />
                    <TicketCard 
                        title="Low Priority"
                        value={tickets.filter(ticket => ticket.priority === "low").length}
                        textColor="text-gray-500"
                    />
                </div>
                    
                    
            </div>
        </section>
    )
}

export function TicketCard({title, value, textColor}: {title: string, value: number, textColor: string}) {

    return (
        <div className="bg-white rounded-md shadow-md p-6 hover:shadow-[#e7008a5f]">
            <h2 className="text-xl font-medium text-gray-700 mb-2">{title}</h2>
            <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
        </div>
    )
}