import { useContext } from 'react'
import { DropdownContext } from './Dropdown'

export default function DropdownList({ children }) {
    const { open } = useContext(DropdownContext)

    return (
        <div className={`dropdown${open ? ' show' : ''}`}>
            {children}
        </div>
    )
}