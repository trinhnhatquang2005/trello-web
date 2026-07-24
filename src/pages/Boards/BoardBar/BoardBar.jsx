
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip';
import VpnLockIcon from '@mui/icons-material/VpnLock'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip';
import { capitalizeFirstLetter } from '~/utils/formatters'
import InviteBoardUser from './InviteBoardUser'
import BoardUserGroup from './BoardUserGroup'

const MENU_STYLES = {
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    px: 5,
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}

function BoardBar({ board }) {
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
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                '&::-webkit-scrollbar-track': {
                    m: 2
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title={board?.description}>
                    <Chip
                        icon={<DashboardIcon />}
                        label={board?.title}
                        clickable
                        sx={MENU_STYLES}
                    />
                </Tooltip>
                <Chip
                    icon={<VpnLockIcon />}
                    label={capitalizeFirstLetter(board?.type)}
                    clickable
                    sx={MENU_STYLES}
                />
                <Chip
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
                {/* Mời thành viên vào board */}
                <InviteBoardUser boardId={board?._id} />
                {/* <AvatarGroup
                    max={5}
                    sx={{
                        gap: '10px',
                        '& .MuiAvatar-root': {
                            width: 34,
                            height: 34,
                            fontSize: 16,
                            border: 'none',
                            color: 'whit',
                            cursor: 'pointer',
                            '&:first-of-type': {
                                bgcolor: '#a4b0be'
                            }
                        }
                    }}
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
                </AvatarGroup> */}

                <BoardUserGroup boardUsers={board?.FE_allUsers || []} />
            </Box>
        </Box>
    )
}

export default BoardBar