import { DashboardHeader, Overview, RecentTickets, SideBar } from "../component"


export default function Dashboard() {

    return (
        <>
            <SideBar className="hidden" />
            <main className="w-full md:w-[calc(100%-240px)] h-screen md:ml-60">
                <DashboardHeader title="Dashboard"/>
                <Overview />
                <RecentTickets />
            </main>
        </>
    )
}

// bg-[#cfdff7]