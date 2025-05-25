import Dropdown from './Dropdown/index'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'

import personIcon from '../assets/images/person.svg'
import settingsIcon from '../assets/images/settings.svg'
import logoutIcon from '../assets/images/logout.svg'

export default function ProfileDropdown() {
    return (
        <Dropdown id='profile-dropdown'>
            <Dropdown.Button>
                <IconButton
                    size='small'
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={{
                            color: '#000',
                            width: 35,
                            height: 35,
                            fontSize: '18px'
                        }}
                        alt='Remy Sharp'
                        src='/broken-image.jpg'
                    >
                        B
                    </Avatar>
                </IconButton>
            </Dropdown.Button>
            <Dropdown.List>
                <ul className='dropdown__profile'>
                    <Dropdown.Item><img src={personIcon} alt='Profile icon' /> My profile</Dropdown.Item>
                    <Dropdown.Item><img src={settingsIcon} alt='Settings icon' /> Settings</Dropdown.Item>
                    <Dropdown.Item className='dropdown__item dropdown__logout'>
                        <img src={logoutIcon} alt='Settings icon' /> Log out
                    </Dropdown.Item>
                </ul>
            </Dropdown.List>
        </Dropdown>
    )
}