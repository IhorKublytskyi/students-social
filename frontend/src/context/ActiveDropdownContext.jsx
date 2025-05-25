import { useState, createContext } from 'react'

export const ActiveDropdownContext = createContext()

export function ActiveDropdownProvider({ children }) {
    const [activeId, setActiveId] = useState(null)

    return (
        <ActiveDropdownContext.Provider value={{ activeId, setActiveId }}>
            {children}
        </ActiveDropdownContext.Provider>
    )
}