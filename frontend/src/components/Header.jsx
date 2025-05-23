import { useState } from 'react'

import { Link } from 'react-router'

import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Badge from '@mui/material/Badge'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'


export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)

    function handleClick(e) {
        setAnchorEl(e.currentTarget)
    }

    function handleClose(e) {
        setAnchorEl(null)
    }

    return (
        <header className='header'>
            <Link className='logo' to='/'>
                <p className="logo__text">StudensSocial</p>
            </Link>
            <div className="header__controls">
                <IconButton aria-label="cart">
                    <Badge badgeContent={4} color="primary">
                        <NotificationsIcon sx={{
                            fontSize: '28px'
                        }} />
                    </Badge>
                </IconButton>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt="Remy Sharp"
                        src="/broken-image.jpg"
                    >
                        B
                    </Avatar>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                width: '220px',
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 18,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Avatar /> Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </header>
    )
}