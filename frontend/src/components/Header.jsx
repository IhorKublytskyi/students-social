import { Link } from 'react-router'

import ProfileDropdown from './ProfileDropdown'
import NotificationsDropdown from './NotificationsDropdown'

import mailIcon from '../assets/images/mail.svg'
import searchIcon from '../assets/images/search.svg'
import logo from '../assets/images/logo.svg'

import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

export default function Header() {
    return (
        <header className='header'>
            <Link className='logo' to='/'>
                <img className='logo__img' src={logo} alt='Students Social Logo' />
            </Link>
            <form className='search-bar__form'>
                <input className='search-bar__input' type='text' placeholder='Search' />
                <button className='search-bar__button'>
                    <img className='search-bar__icon' src={searchIcon} alt='Search icon' />
                </button>
            </form>
            <div className='header__controls'>
                <Link to='/messages'>
                    <IconButton aria-label='messages'>
                        <Badge
                            badgeContent={2}
                            color='primary'
                            sx={{
                                '& .MuiBadge-badge': {
                                    right: 3,
                                    top: 3,
                                    border: `1px solid #000`,
                                    padding: '0 4px',
                                },
                            }}
                        >
                            <img className='messages__icon' src={mailIcon} alt='messages icon' />
                        </Badge>
                    </IconButton>
                </Link>
                <NotificationsDropdown />
                <ProfileDropdown />
            </div>
        </header>
    )
}