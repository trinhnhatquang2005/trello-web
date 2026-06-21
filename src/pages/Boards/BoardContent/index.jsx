import React from "react";
import Box from "@mui/material/Box";
export default function BoardContent() {
    return (
        <Box sx={{
            backgroundColor: "primary.main",
            height: (theme) => theme.trello.boardContentHeight,
            display: 'flex',
            alignItems: 'center',
        }}>Board Content</Box>
    )
}