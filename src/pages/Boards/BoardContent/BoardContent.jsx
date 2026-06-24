import ListColumns from "./ListColumns/ListColumns"
import Box from "@mui/material/Box"
import { mapOrder } from "~/utils/sorts"
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import { useState, useEffect } from "react"
import { arrayMove } from "@dnd-kit/sortable"
export default function BoardContent({ board }) {
    // const pointerSensor = useSensor(PointerSensor, {
    //     activationConstraint: {
    //         distance: 10, // 10px là bắt đầu kéo
    //     },
    // })

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, // 10px là bắt đầu kéo
        },
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250, // 250ms là bắt đầu kéo
            tolerance: 500 // 5px là bắt đầu kéo
        }
    })

    // const sensors = useSensors(pointerSensor)
    const sensors = useSensors(mouseSensor, touchSensor)
    const [orderedColumns, setOrderedColumns] = useState([])

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    const handleDragEnd = (event) => {
        console.log('handleDragEnd: ', event)
        const { active, over } = event

        //nếu không kéo qua column nào cả 
        if (!over) return

        //nếu kéo qua column khác với vị trí cũ
        if (active.id !== over.id) {
            //lấy vị trí cũ (từ thằng active)
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            //lấy vị trí mới (từ thằng over)
            const newIndex = orderedColumns.findIndex(c => c._id === over.id)
            //sắp xếp lại mảng
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
            // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

            // console.log('dndOrderedColumns: ', dndOrderedColumns)
            // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

            //cập nhật lại state orderedColumns
            setOrderedColumns(dndOrderedColumns)
        }

    }
    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors} >
            <Box sx={{
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                display: 'flex',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                p: '10px 0'
            }}>
                <ListColumns columns={orderedColumns} />
            </Box>
        </DndContext>
    )
}