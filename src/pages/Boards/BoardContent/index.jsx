import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useId } from "react";
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

export default function BoardContent() {
    const id = useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardContentHeight,
            display: 'flex',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            p: '10px 0'
        }}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': {
                    m: 2
                }

            }}>
                {/** Box Columns 1*/}
                <Box sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
                }}>
                    {/* Column Header */}
                    <Box sx={{
                        height: COLUMN_HEADER_HEIGHT,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}>
                            Column Title
                        </Typography>
                        <Box>
                            <Tooltip title="More options">
                                <ExpandMoreIcon
                                    id={buttonId}
                                    aria-controls={open ? menuId : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open}
                                    onClick={handleClick}
                                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                                />
                            </Tooltip>
                            <Menu
                                id={menuId}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': buttonId,
                                    },
                                }}
                            >
                                <MenuItem>
                                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText>Add new card</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                    <ListItemText>Cut</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                                    <ListItemText>Copy</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                                    <ListItemText>Paste</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText>Remove this column</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                    <ListItemText>Archive this column</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Column Content */}
                    <Box sx={{
                        p: '0 5px',
                        m: '0 5px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        maxHeight: (theme) => `calc(
                        ${theme.trello.boardContentHeight} - 
                        ${theme.spacing(5)} - 
                        ${theme.trello.columnHeaderHeight} -
                        ${theme.trello.columnFooterHeight})`,
                        // Phần kéo (thumb)
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#ced0da',
                            borderRadius: '8px',
                        },
                        // Hover vào thumb
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#bfc2cf',
                        },
                    }}>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://nld.mediacdn.vn/zoom/594_371/291774122806476800/2021/4/30/img-3280-1619746430168651445162.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Trung Quan Dev MERN STACK PRO</Typography>
                            </CardContent>
                            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Column Footer */}
                    <Box sx={{
                        height: COLUMN_FOOTER_HEIGHT,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Button startIcon={<AddCardIcon />}>
                            Add new card
                        </Button>
                        <Tooltip title="Drag to move">
                            <DragHandleIcon sx={{
                                cursor: "pointer"
                            }} />
                        </Tooltip>
                    </Box>
                </Box>

                {/** Box Columns 2*/}
                <Box sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
                }}>
                    {/* Column Header */}
                    <Box sx={{
                        height: COLUMN_HEADER_HEIGHT,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}>
                            Column Title
                        </Typography>
                        <Box>
                            <Tooltip title="More options">
                                <ExpandMoreIcon
                                    id={buttonId}
                                    aria-controls={open ? menuId : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open}
                                    onClick={handleClick}
                                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                                />
                            </Tooltip>
                            <Menu
                                id={menuId}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': buttonId,
                                    },
                                }}
                            >
                                <MenuItem>
                                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText>Add new card</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                    <ListItemText>Cut</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                                    <ListItemText>Copy</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                                    <ListItemText>Paste</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText>Remove this column</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                    <ListItemText>Archive this column</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Column Content */}
                    <Box sx={{
                        p: '0 5px',
                        m: '0 5px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        maxHeight: (theme) => `calc(
                        ${theme.trello.boardContentHeight} - 
                        ${theme.spacing(5)} - 
                        ${theme.trello.columnHeaderHeight} -
                        ${theme.trello.columnFooterHeight})`,
                        // Phần kéo (thumb)
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#ced0da',
                            borderRadius: '8px',
                        },
                        // Hover vào thumb
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#bfc2cf',
                        },
                    }}>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://nld.mediacdn.vn/zoom/594_371/291774122806476800/2021/4/30/img-3280-1619746430168651445162.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Trung Quan Dev MERN STACK PRO</Typography>
                            </CardContent>
                            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{
                                p: 1.5,
                                '&:last-child': {
                                    paddingBottom: 1.5
                                }
                            }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Column Footer */}
                    <Box sx={{
                        height: COLUMN_FOOTER_HEIGHT,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Button startIcon={<AddCardIcon />}>
                            Add new card
                        </Button>
                        <Tooltip title="Drag to move">
                            <DragHandleIcon sx={{
                                cursor: "pointer"
                            }} />
                        </Tooltip>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}