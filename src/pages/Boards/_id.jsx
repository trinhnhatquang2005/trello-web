
import Container from "@mui/material/Container";
import BoardContent from "./BoardContent/BoardContent";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from "react"
import { fetchBoardDetailsAPI } from "~/apis"

export default function Board() {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        const boardId = '6a44b4595f226356d79def9b'
        fetchBoardDetailsAPI(boardId).then(board => {
            setBoard(board)
        })
    }, [])

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={mockData.board} />
            <BoardContent board={mockData.board} />
        </Container>
    )
}
