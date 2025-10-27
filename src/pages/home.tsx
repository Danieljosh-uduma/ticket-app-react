import { Header, Hero, HowItWorks, Testimonials, Footer } from "../component";

export default function LandingPage() {

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



