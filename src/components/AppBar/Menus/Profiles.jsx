import * as React from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import { Link } from 'react-router-dom'

export default function Profiles() {
    const id = React.useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)

    const confirmLogout = useConfirm()
    const handleLogout = () => {
        confirmLogout({
            title: 'Log out of your account?',
            confirmationText: 'Confirm',
            cancellationText: 'Cancel'
        }).then(({ confirmed }) => {
            if (!confirmed) return
            // Gọi API đăng xuất người dùng
            dispatch(logoutUserAPI())
        }).catch(() => { })
    }

    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ p: 0 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                >
                    <Avatar sx={{ width: 36, height: 36 }} alt={currentUser?.username} src={currentUser?.avatar} />
                </IconButton>
            </Tooltip>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': buttonId,
                    },
                }}
            >
                <Link to="/settings/account" style={{ color: 'inherit' }}>
                    <MenuItem sx={{ '&:hover': { color: 'success.light' } }}>
                        <Avatar sx={{ width: 28, height: 28, mr: 2 }} src={currentUser?.avatar} /> Profile
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem >
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{
                    '&:hover': {
                        color: 'warning.dark',
                        '& .logout-icon': { color: 'warning.dark' }
                    }
                }}>
                    <ListItemIcon>
                        <Logout className='logout-icon' fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}
