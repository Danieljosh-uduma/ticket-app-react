import { useEffect } from "react";
import { Header, Hero, HowItWorks, Testimonials, Footer } from "../component";

export default function LandingPage() {

    useEffect(() => {
        fetch("/api/users").then(res => res)
        fetch("/api/users",{
            method: "POST",
            body: JSON.stringify({name: "john doe"})
        })
        fetch("/api/users/2").then(res => res.json()).then(data => console.log(data))
        fetch("/api/users/2", {
            method: "DELETE", 
        })
        fetch("/api/users/2").then(res => res.json()).then(data => console.log(data))
    })

    return (
        <>  
            <Header 
                link="/auth" 
                title="Login"
            />
            <main>
                <Hero />
                <HowItWorks />
                <Testimonials />
            </main>
            <Footer />
        </>
    )
}



