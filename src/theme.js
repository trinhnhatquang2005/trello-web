import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px',
        boardContentHeight: 'calc(100vh - 58px - 60px)',
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