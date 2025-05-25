import Dropdown from './Dropdown/index'

import bellIcon from '../assets/images/bell.svg'

import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

import personIcon from '../assets/images/person.svg'
import settingsIcon from '../assets/images/settings.svg'
import logoutIcon from '../assets/images/logout.svg'
import { Link } from 'react-router'

export default function NotificationsDropdown() {
    return (
        <Dropdown id='notification-dropdown'>
            <Dropdown.Button>
                <IconButton aria-label='notifications'>
                    <Badge
                        badgeContent={9}
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
                        <img className='notifications__icon' src={bellIcon} alt='bell icon' />
                    </Badge>
                </IconButton>
            </Dropdown.Button>
            <Dropdown.List className='dropdown__list notifications__list'>
                <ul className='dropdown__notifications'>
                    <Dropdown.Item>
                        <p><Link to='/user/max'>Max</Link> started following you</p> 
                        <span className='dropdown__time'>12:37 PM</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <p><Link to='/user/max'>Max</Link> started following you</p> 
                        <span className='dropdown__time'>12:37 PM</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <p><Link to='/user/max'>Max</Link> started following you</p> 
                        <span className='dropdown__time'>12:37 PM</span>
                    </Dropdown.Item>
                </ul>
            </Dropdown.List>
        </Dropdown>
    )
}