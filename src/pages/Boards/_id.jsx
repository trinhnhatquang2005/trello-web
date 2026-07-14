
import Container from "@mui/material/Container";
import BoardContent from "./BoardContent/BoardContent";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import { useEffect } from "react"
import { updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentColumnAPI } from "~/apis"
import { cloneDeep } from "lodash";
import {
    fetchBoardDetailsAPI,
    updateCurrentActiveBoard,
    selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'




export default function Board() {
    const dispatch = useDispatch()
    // const [board, setBoard] = useState(null)

    const board = useSelector(selectCurrentActiveBoard)

    const { boardId } = useParams()

    useEffect(() => {
        // Tạm thời fix cứng boardId, flow chuẩn chỉnh về sau khi học nâng cao trực tiếp với mình là chúng ta sẽ sử dụng react-router-dom để lấy chuẩn boardId từ URL. Chi tiết hơn xem tại playlist nâng cao này: https://youtube.com/playlist?list=PLP6tw4Zpj-RJbPQfTZ0eCAXH_mHQiuf2G
        // const boardId = '6a44b4595f226356d79def9b'
        dispatch(fetchBoardDetailsAPI(boardId))
    }, [dispatch, boardId])



    /**
    * Func này có nhiệm vụ gọi API và xử lý khi kéo thả Column xong xuôi
    * Chỉ cần gọi API để cập nhật mảng columnOrderIds của Board chứa nó (thay đổi vị trí trong board)
    */
    const moveColumns = (dndOrderedColumns) => {
        // Update cho chuẩn dữ liệu state Board
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

        /**
    * Trường hợp dùng Spread Operator này thì lại không sao bởi vì ở đây chúng ta không dùng push như ở trên làm thay đổi
    * trực tiếp kiểu mở rộng mảng, mà chỉ đang gán lại toàn bộ giá trị columns và columnOrderIds bằng 2 mảng mới.
    * Tương tự như cách làm concat ở trường hợp createNewColumn thôi :))
    */
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

        // Gọi API update Board
        updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
    }

    /**
      * Khi di chuyển card trong cùng Column:
      * Chỉ cần gọi API để cập nhật mảng cardOrderIds của Column chứa nó (thay đổi vị trí trong mảng)
      */
    const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
        // Update cho chuẩn dữ liệu state Board
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards
            columnToUpdate.cardOrderIds = dndOrderedCardIds
        }
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

        // Gọi API update Column
        updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
    }

    const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

        // Gọi API xử lý phía BE
        let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
        // Xử lý vấn đề khi kéo Card cuối cùng ra khỏi Column, Column rỗng sẽ có placeholder card, cần xóa nó đi trước khi gửi dữ liệu lên cho phía BE. (Nhớ lại video 37.2)
        if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

        moveCardToDifferentColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
        })
    }

    if (!board) {
        return (
            <PageLoadingSpinner caption="Loading Board..." />
        )
    }
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board}

                moveColumns={moveColumns}
                moveCardInTheSameColumn={moveCardInTheSameColumn}
                moveCardToDifferentColumn={moveCardToDifferentColumn}
            />
        </Container>
    )
}
