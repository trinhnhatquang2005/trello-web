import ModeSelect from "~/components/ModeSelect";
import Box from "@mui/material/Box";
import AppsIcon from '@mui/icons-material/Apps';
import TrelloLogo from '~/assets/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Started from "./Menus/Started";
import Templates from "./Menus/Templates";
import TextField from "@mui/material/TextField";
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from '@mui/icons-material/Help';
import Profiles from "./Menus/Profiles";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

export default function AppBar() {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            gap: 2,
            overflowX: 'auto',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'primary.main' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={TrelloLogo} fontSize='small' inheritViewBox sx={{ color: 'primary.main' }} />
                    <Typography variant='span' sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.2rem' }}>
                        Trello
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        <Workspaces />
                        <Recent />
                        <Started />
                        <Templates />
                        <Button variant="outlined" startIcon={<LibraryAddIcon />}>Create</Button>
                    </Box>


                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField id="outlined-basic" label="Search..." type="search" size="small" sx={{ minWidth: 120 }} />
                <ModeSelect />


                <Tooltip title="Notifications">
                    <Badge
                        variant="dot"
                        color="error"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{ cursor: 'pointer' }}
                    >
                        <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
                </Tooltip>

                <Profiles />
            </Box>

        </Box>
    )
}