import { createContext, useEffect, useContext, } from 'react'
import { ActiveDropdownContext } from '../../context/ActiveDropdownContext'

const DropdownContext = createContext()

export default function Dropdown({ children, id }) {
    const { activeId, setActiveId } = useContext(ActiveDropdownContext)

    const open = activeId === id

    useEffect(() => {
        function handleOutsideClick(e) {
            const parent = e.target.closest('.dropdown__wrapper')

            if (!parent) setActiveId(null)
        }

        window.addEventListener('click', handleOutsideClick)

        return () => {
            window.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <DropdownContext.Provider value={{ open, setActiveId, id }}>
            <div className='dropdown__wrapper'>
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

export {
    DropdownContext
}