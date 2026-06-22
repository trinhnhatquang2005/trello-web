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
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export default function AppBar() {
    const [searchValue, setSearchValue] = useState('')
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
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'white' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={TrelloLogo} fontSize='small' inheritViewBox sx={{ color: 'white' }} />
                    <Typography variant='span' sx={{ fontWeight: 'bold', color: 'white', fontSize: '1.2rem' }}>
                        Trello
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        <Workspaces />
                        <Recent />
                        <Started />
                        <Templates />
                        <Button
                            sx={{ color: 'white' }}
                            startIcon={<LibraryAddIcon />}
                        >
                            Create
                        </Button>
                    </Box>


                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Search..."
                    type="text"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    // placeholder="Search..."
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CloseIcon
                                        onClick={() => setSearchValue('')}
                                        sx={{
                                            color: 'white',
                                            fontSize: 'small',
                                            cursor: 'pointer',
                                            display: searchValue.length <= 0 ? 'none' : 'block'
                                        }} />
                                </InputAdornment>
                            )
                        },
                        inputLabel: { shrink: true }
                    }}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '180px',
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }
                        }
                    }} />
                <ModeSelect />
                <Tooltip title="Notifications">
                    <Badge
                        variant="dot"
                        color="warning"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{ cursor: 'pointer' }}
                    >
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpIcon sx={{ cursor: 'pointer', color: 'white' }} />
                </Tooltip>

                <Profiles />
            </Box>

        </Box>
    )
}