import { createTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = createTheme({
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    },
    colorSchemes: {
        // light: {
        //     palette: {
        //         primary: { main: '#1976d2' },
        //         background: { default: '#f5f5f5', paper: '#ffffff' },
        //         text: { primary: '#111', secondary: '#555' },
        //     },
        // },
        // dark: {
        //     palette: {
        //         primary: { main: '#90caf9' },
        //         background: { default: '#121212', paper: '#1e1e1e' },
        //         text: { primary: '#eee', secondary: '#aaa' },
        //     },
        // },
        light: true,
        dark: true,
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    textTransform: 'none',
                    borderWidth: '0.5px',
                    '&:hover': {
                        borderWidth: '1px',
                    },
                    '&.Mui-focused': {
                        borderWidth: '1px',
                    }
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: {
                    fontSize: '0.875rem',
                }
            },
        },
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    '&.MuiTypography-body1': {
                        fontSize: '0.875rem',
                    }
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    // color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                    // '.MuiOutlinedInput-notchedOutline': {
                    //     borderColor: theme.palette.primary.light,
                    // },
                    // '&:hover': {
                    //     '.MuiOutlinedInput-notchedOutline': {
                    //         borderColor: theme.palette.primary.main,
                    //     }
                    // },
                    '& fieldset': {
                        borderWidth: '0.5px !important',
                    },
                    '&:hover fieldset': {
                        borderWidth: '1px !important',
                    },
                    '&.Mui-focused fieldset': {
                        borderWidth: '1px !important',
                    }
                }


            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    // Chiều cao thanh scrollbar ngang
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    // Phần kéo (thumb)
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#dcdde1',
                        borderRadius: '8px',
                    },
                    // Hover vào thumb
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'white',
                    },
                },
            },
        },
    },
});

export default theme;