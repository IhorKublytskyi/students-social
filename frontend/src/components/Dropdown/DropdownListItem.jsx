export default function DropdownListItem({ children, ...rest }) {
    return (
        <li className='dropdown__item' {...rest} tabIndex={0}>
            {children}
        </li>
    )
}