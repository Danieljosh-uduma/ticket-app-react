import { type JSX } from "react";
import { AuthContext } from ".";



export function AuthProvider({children}: {children: JSX.Element}) {
    const token = localStorage.getItem("ticketapp_session")

    return (
        <AuthContext.Provider value={token}>
            {children}
        </AuthContext.Provider>
    )
}
