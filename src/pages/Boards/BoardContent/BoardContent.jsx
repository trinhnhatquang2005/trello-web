import ListColumns from "./ListColumns/ListColumns"
import Box from "@mui/material/Box"
import { mapOrder } from "~/utils/sorts"
export default function BoardContent({ board }) {
    const orderColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardContentHeight,
            display: 'flex',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            p: '10px 0'
        }}>
            <ListColumns columns={orderColumns} />
        </Box>
    )
}