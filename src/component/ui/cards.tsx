import type { JSX } from "react"

type CardProp = {
    title: string
    description: string
    icon: JSX.Element
}

export function Card1({title, description, icon}: CardProp) {

    return (
        <div className="p-8 rounded-lg shadow-lg hover:shadow-[#e7008a21]">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-500 mx-auto mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

type TestimonialCardProp = {
    feedback: string
    author: string
    position: string
}

export function TestimonialCard({feedback, author, position}: TestimonialCardProp) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-[#e7008a21] text-gray-800">
            <p className="italic mb-4">"{feedback}"</p>
            <p className="font-bold">{author}</p>
            <p className="text-sm text-gray-600">{position}</p>
        </div>
    )
}