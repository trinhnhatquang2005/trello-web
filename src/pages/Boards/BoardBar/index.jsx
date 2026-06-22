
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip';
import VpnLockIcon from '@mui/icons-material/VpnLock'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd'
const MENU_STYLES = {
    color: 'primary.main',
    backgroundColor: 'white',
    border: 'none',
    px: 5,
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'primary.main'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}

function BoardBar() {
    return (
        <Box
            sx={{

                width: '100%',
                height: (theme) => theme.trello.boardBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                gap: 2,
                overflowX: 'auto',
                borderTop: '1px solid #1976d2'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    icon={<DashboardIcon />}
                    label="TrungQuanDev Mern Stack Pro"
                    clickable
                    sx={MENU_STYLES}
                /><Chip
                    icon={<VpnLockIcon />}
                    label="Public/Private Workspace"
                    clickable
                    sx={MENU_STYLES}
                /><Chip
                    icon={<AddToDriveIcon />}
                    label="Add to Drive"
                    clickable
                    sx={MENU_STYLES}
                />
                <Chip
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable
                    sx={MENU_STYLES}
                />
                <Chip
                    icon={<FilterListIcon />}
                    label="Filters"
                    clickable
                    sx={MENU_STYLES}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button >
                <AvatarGroup
                    max={5}
                    sx={{ '& .MuiAvatar-root': { width: 34, height: 34, fontSize: 16 } }}
                >
                    <Tooltip title="TrungQuangDev">
                        <Avatar alt="TrungQuangDev" src="/broken-image.jpg" />
                    </Tooltip>
                    <Tooltip title="Travis Howard">
                        <Avatar alt="Travis Howard" src="/broken-image.jpg" />
                    </Tooltip>
                    <Tooltip title="Cindy Baker">
                        <Avatar alt="Cindy Baker" src="/broken-image.jpg" />
                    </Tooltip>
                    <Tooltip title="Agnes Underwood">
                        <Avatar alt="Agnes Underwood" src="/broken-image.jpg" />
                    </Tooltip>
                    <Tooltip title="Trevor Henderson">
                        <Avatar alt="Trevor Henderson" src="/broken-image.jpg" />
                    </Tooltip>
                    <Tooltip title="Trevor Henderson">
                        <Avatar alt="Trevor Henderson" src="/broken-image.jpg" />
                    </Tooltip>
                    <Tooltip title="Trevor Henderson">
                        <Avatar alt="Trevor Henderson" src="/broken-image.jpg" />
                    </Tooltip>
                    <Tooltip title="Trevor Henderson">
                        <Avatar alt="Trevor Henderson" src="/broken-image.jpg" />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar