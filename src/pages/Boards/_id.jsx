
import Container from "@mui/material/Container";
import BoardContent from "./BoardContent/BoardContent";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from "react"
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from "~/apis"
import { generatePlaceholderCard } from "~/utils/formatters"
import { isEmpty } from "lodash";

export default function Board() {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        const boardId = '6a44b4595f226356d79def9b'
        fetchBoardDetailsAPI(boardId).then(board => {
            board.columns.forEach(column => {
                // Khi f5 trang web thì cần xử lý vấn đề kéo thả vào một column rỗng (Nhớ lại video 37.2, code hiện tại là video 69)
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                }

            })
            setBoard(board)
        })
    }, [])

    // Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        })

        // Khi tạo column mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng (Nhớ lại video 37.2, code hiện tại là video 69)
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        // Cập nhật state board
        // Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
        // Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này FE sẽ nhàn hơn.
        const newBoard = { ...board }
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        setBoard(newBoard)
    }

    // Func này có nhiệm vụ gọi API tạo mới Card và làm lại dữ liệu State Board
    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id
        })

        // Cập nhật state board
        // Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
        // Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này FE sẽ nhàn hơn.
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
        if (columnToUpdate) {
            // Nếu column rỗng: bản chất là đang chứa một cái Placeholder card (Nhớ lại video 37.2, hiện tại là video 69)
            if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard]
                columnToUpdate.cardOrderIds = [createdCard._id]
            } else {
                // Ngược lại Column đã có data thì push vào cuối mảng
                columnToUpdate.cards.push(createdCard)
                columnToUpdate.cardOrderIds.push(createdCard._id)
            }
        }
        setBoard(newBoard)
    }

    /**
   * Func này có nhiệm vụ gọi API và xử lý khi kéo thả Column xong xuôi
   * Chỉ cần gọi API để cập nhật mảng columnOrderIds của Board chứa nó (thay đổi vị trí trong board)
   */
    const moveColumns = (dndOrderedColumns) => {
        // Update cho chuẩn dữ liệu state Board
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        setBoard(newBoard)

        // Gọi API update Board
        updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
    }


    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} moveColumns={moveColumns} />
        </Container>
    )
}
