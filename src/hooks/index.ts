import { createContext } from "react"

export * from "./navigate"
export const AuthContext = createContext<string | null>(null)
