import { useNavigate } from "react-router";

export function Goto(url: string) {
    const navigate = useNavigate()

    navigate(url)
}