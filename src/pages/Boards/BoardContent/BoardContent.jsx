import ListColumns from "./ListColumns/ListColumns"
import Box from "@mui/material/Box"
import { mapOrder } from "~/utils/sorts"
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core"
import { useState, useEffect } from "react"
import { cloneDeep } from "lodash"
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

    const findColumByCardId = (cardId) => {
        // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds 
        // bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới.
        return orderedColumns.find(column => column?.cards?.some(card => card._id === cardId))
    }

    const hanldeDragStart = (event) => {
        console.log('hanldeDragStart: ', event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }

    //Trigger trong qua trinh keo (drag) phan tu
    const handleDragOver = (event) => {

        //Neu keo column thi khong lam gi ca
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        //Neu keo card thi xu ly them de co the keo card qua lai giua cac columns
        // console.log('handleDragOver: ', event)
        const { active, over } = event
        if (!active || !over) return

        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId, data: { current: overCardData } } = over

        //Tim 2 cai column theo cardid
        const activeColumn = findColumByCardId(activeDraggingCardId)
        const overColumn = findColumByCardId(overCardId)

        if (!activeColumn || !overColumn) return

        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns(prevColumns => {
                //1.Tìm vị trí overCard trong column dich
                const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

                let newCardIndex
                const isBelowOverItem = active.rect.current.translate &&
                    active.rect.current.top > over.rect.top + over.rect.height
                const modifier = isBelowOverItem ? 1 : 0
                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.lenght + 1

                const nextColumns = cloneDeep(prevColumns)
                const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
                const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

                if (nextActiveColumn) {
                    //xoa card khoi column cu
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
                    //cap nhat column order ids
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
                }

                if (nextOverColumn) {
                    //Kiem tra xem card co ton tai trong column dich khong
                    nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

                    //cap nhat column order ids
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
                }

                //return
                return nextColumns

            })
        }

    }

    const handleDragEnd = (event) => {
        // console.log('handleDragEnd: ', event)

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // console.log('Hanh dong keo tha card - Tam thoi khong lam gi ca')
            return
        }

        const { active, over } = event

        //nếu không kéo qua column nào cả 
        if (!active || !over) return

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
            sensors={sensors}
            onDragStart={hanldeDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
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