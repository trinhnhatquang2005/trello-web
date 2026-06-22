MuiCssBaseline: {
    styleOverrides: {
        body: {
            '*::-webkit-scrollbar': {
                width: '6px',    // scrollbar dọc
                    height: '6px',   // scrollbar ngang
            },
            '*::-webkit-scrollbar-track': {
                background: 'transparent',
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                    borderRadius: '4px',
            },
            '*::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555',
            },
        },
    },
},