import React from "react";
import Box from "@mui/material/Box";
export default function BoardContent() {
    return (
        <Box sx={{
            backgroundColor: "primary.main",
            height: (theme) => theme.trello.boardContentHeight,
            display: 'flex',
            alignItems: 'center',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
        }}>Board Content</Box>
    )
}