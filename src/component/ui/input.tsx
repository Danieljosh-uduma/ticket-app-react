import type { ChangeEventHandler } from "react"

type InputProp = {
    name: string
    label: string
    placeholder: string
    type: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    onInput?: ChangeEventHandler<HTMLInputElement>
    isValid: boolean
    message?: string
}
export function Input({name, label, placeholder, type, value, onChange, onInput, isValid, message}: InputProp) {

    return (
        <label htmlFor={name} className="flex flex-col gap-3 font-bold">
            {label}
            <input 
                type={type} 
                id={name} 
                name={name} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange}
                onInput={onInput}
                required
                className={`w-full border ${isValid === false? "border-red-300 shadow-red-50": "border-primary-400"} text-black shadow-lg focus:outline-[#0066FF] focus:shadow-[#0066FF21] rounded-lg h-10 px-4`}
            />
            {isValid === false && <span aria-live="polite" className="text-red-400 text-sm font-medium">{message? message: "invalid input"}</span>}

        </label>
    )
}