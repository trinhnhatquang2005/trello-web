import ListColumns from "./ListColumns/ListColumns"
import Box from "@mui/material/Box"
import { mapOrder } from "~/utils/sorts"
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core"
import { useState, useEffect } from "react"
import { arrayMove } from "@dnd-kit/sortable"
import Card from "./ListColumns/Column/ListCards/Card/Card"
import Column from "./ListColumns/Column/Column"
const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

    //Cung mot thoi diem chi co mot phan tu dang duoc keo: Column hoac Card
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    const hanldeDragStart = (event) => {
        console.log('hanldeDragStart: ', event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }

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

        //reset state drag
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
    }

    /**
      * Animation khi thả (Drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ Overlay (video 32)
      */
    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
    }

    return (
        <DndContext
            onDragStart={hanldeDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors} >
            <Box sx={{
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                display: 'flex',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                p: '10px 0'
            }}>
                <ListColumns columns={orderedColumns} />
                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}