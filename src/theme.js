import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px',
        boardContentHeight: 'calc(100vh - 58px - 60px)',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: { main: '#1976d2' },
                background: { default: '#f5f5f5', paper: '#ffffff' },
                text: { primary: '#111', secondary: '#555' },
            },
        },
        dark: {
            palette: {
                primary: { main: '#90caf9' },
                background: { default: '#121212', paper: '#1e1e1e' },
                text: { primary: '#eee', secondary: '#aaa' },
            },
        },
    },
});

export default theme;