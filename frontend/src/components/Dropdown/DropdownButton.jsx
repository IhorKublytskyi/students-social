import { useContext } from 'react'
import { DropdownContext } from './Dropdown'

export default function DropdownButton({ children }) {
    const { setActiveId, id } = useContext(DropdownContext)

    return (
        <div onClick={() => setActiveId(id)}>
            {children}
        </div>
    )
}