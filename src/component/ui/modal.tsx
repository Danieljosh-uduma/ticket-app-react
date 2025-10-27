import { CreateTicketForm } from "./form";
import { Button } from "./button";
import { useState } from "react";
import { deleteTicketById } from "../../services/api";
import { useNavigate } from "react-router";


export function CreateTicketModal({closeModal}: {closeModal: (value: boolean) => void}) {

    return (
        <section className="w-screen h-screen top-0 left-0 z-1000 fixed bg-[rgba(0,0,0,0.5)]">
            <div className="relative">
                <div className="fixed top-10 left-3 right-3 sm:left-20 sm:right-20! md:left-[20%] md:right-[20%]! xl:left-[30%] xl:right-[30%]! h-auto rounded-3xl shadow-lg bg-white opacity-100 p-10 z-1001">
                    <h2 className="text-3xl font-semibold text-gray-800">Create Tickets</h2>
                    <CreateTicketForm closeModal={closeModal}/>
                </div>
            </div>
            
        </section>
    )
}

export function MenuTicketModal({openModal, id}: {openModal: (value: boolean) => void, id: number}) {
    const [deleteModal, setDeleteModal] = useState(false)

    

    return (
        <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white">
            <div className="py-1" role="none">
                <Button type="button" className="w-full text-gray-700 block px-4 py-2 text-sm font-bold hover:bg-gray-100" onClick={() => openModal(true)}>Edit</Button>
                <Button type="button" className="w-full text-gray-700 block px-4 py-2 text-sm font-bold hover:bg-gray-100" onClick={() => setDeleteModal(true)}>Delete</Button>
            </div>
            {deleteModal && <DeleteTicket setDeleteModal={setDeleteModal} id={id}/>}
        </div>
    )
}

export function DeleteTicket({setDeleteModal, id}: {setDeleteModal: (value: boolean) => void, id: number}) {
    const navigate = useNavigate()
    const handleClick = () => {
        deleteTicketById(id)
        setDeleteModal(false)
        navigate("/dashboard")
    }

    return (
        <section className="w-screen h-screen top-0 left-0 z-1000 fixed bg-[rgba(0,0,0,0.5)]">
            <div className="relative">
                <div className="fixed top-50 left-2 sm:left-20 sm:right-20 md:left-[20%] md:right-[20%] right-2 xl:left-[30%] xl:right-[30%] h-auto rounded-3xl shadow-lg bg-white opacity-100 p-10 z-1001 flex flex-col items-center justify-center">
                    <div>
                        <p>Are you sure you want to <span>delete</span> this ticket?</p>
                        <p>This action cannot be undone.</p>
                    </div>
                    <div className="mt-6 flex">
                        <Button className="bg-[#e7008a] text-white font-bold px-8 py-2 rounded mr-6" type="button" onClick={handleClick}>Delete</Button>
                        <Button className="text-[#e7008a] bg-white border border-[#e7008a] font-bold px-8 py-2 rounded" type="button" onClick={() => setDeleteModal(false)}>Cancel</Button>
                    </div>
                </div>
            </div>
        </section>
            

            
    )
}