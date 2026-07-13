import ListColumns from "./ListColumns/ListColumns"
import Box from "@mui/material/Box"
import { generatePlaceholderCard } from "~/utils/formatters"
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, getFirstCollision } from "@dnd-kit/core"
import { useState, useEffect, useCallback, useRef } from "react"
import { cloneDeep, isEmpty } from "lodash"
import { arrayMove } from "@dnd-kit/sortable"
import Card from "./ListColumns/Column/ListCards/Card/Card"
import Column from "./ListColumns/Column/Column"


const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

export default function BoardContent({
    board,
    moveColumns,
    moveCardInTheSameColumn,
    moveCardToDifferentColumn,


}) {
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
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

    // Điểm va chạm cuối cùng trước đó (xử lý thuật toán phát hiện va chạm, video 37)
    const lastOverId = useRef(null)

    useEffect(() => {
        setOrderedColumns(board?.columns)

    }, [board])

    //     useEffect(() => {
    //     const sortedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    //     sortedColumns.forEach(column => {
    //         column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
    //     })
    //     setOrderedColumns(sortedColumns)
    // }, [board])

    const findColumByCardId = (cardId) => {
        // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds 
        // bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới.
        return orderedColumns.find(column => column?.cards?.some(card => card._id === cardId))
    }

    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        triggerFrom
    ) => {
        setOrderedColumns(prevColumns => {
            //1.Tìm vị trí overCard trong column dich
            const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

            let newCardIndex
            const isBelowOverItem = active.rect.current.translate &&
                active.rect.current.translated.top > over.rect.top + over.rect.height
            const modifier = isBelowOverItem ? 1 : 0
            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.leng + 1

            const nextColumns = cloneDeep(prevColumns)
            const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
            const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

            // nextActiveColumn: Column cũ
            if (nextActiveColumn) {
                // Xóa card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
                nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

                // Thêm Placeholder Card nếu Column rỗng: Bị kéo hết Card đi, không còn cái nào nữa. (Video 37.2)
                if (isEmpty(nextActiveColumn.cards)) {
                    nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
                }

                // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
            }

            if (nextOverColumn) {
                //Kiem tra xem card co ton tai trong column dich khong
                nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

                const rebuild_activeDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id
                }

                //Thêm card vào vị trí mới
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

                // Xóa cái Placeholder Card đi nếu nó đang tồn tại (Video 37.2)
                nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

                //cap nhat column order ids
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
            }

            if (triggerFrom === 'handleDragEnd') {
                moveCardToDifferentColumn(
                    activeDraggingCardId,
                    oldColumnWhenDraggingCard._id,
                    nextOverColumn._id,
                    nextColumns
                )
            }
            //return
            return nextColumns

        })
    }

    const hanldeDragStart = (event) => {
        console.log("event ne thg lon: ", event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)

        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumByCardId(event?.active?.id))
        }
    }

    //Trigger trong qua trinh keo (drag) phan tu
    const handleDragOver = (event) => {

        //Neu keo column thi khong lam gi ca
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        //Neu keo card thi xu ly them de co the keo card qua lai giua cac columns
        console.log('handleDragOver: ', event)
        const { active, over } = event
        if (!active || !over) return

        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over

        //Tim 2 cai column theo cardid
        const activeColumn = findColumByCardId(activeDraggingCardId)
        const overColumn = findColumByCardId(overCardId)

        if (!activeColumn || !overColumn) return

        if (activeColumn._id !== overColumn._id) {
            moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData, "handleDragOver")
        }

    }

    const handleDragEnd = (event) => {
        console.log(event)
        const { active, over } = event

        //nếu không kéo qua column nào cả 
        if (!active || !over) return

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            const { id: overCardId } = over

            //Tim 2 cai column theo cardid
            const activeColumn = findColumByCardId(activeDraggingCardId)
            const overColumn = findColumByCardId(overCardId)

            if (!activeColumn || !overColumn) return

            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData, "handleDragEnd")

            } else {
                //lấy vị trí cũ (từ thằng oldColumnWhenDraggingCard)
                const oldCardsIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
                //lấy vị trí mới (từ thằng over)
                const newCardsIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
                //sắp xếp lại mảng đã đổi chỗ khi di chuyển card trong cùng column
                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardsIndex, newCardsIndex)

                setOrderedColumns(prevColumns => {
                    const nextColumns = cloneDeep(prevColumns)
                    //tìm column đích
                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)
                    //cập nhật lại card order ids
                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
                    //find chỉ tìm đúng column cần sửa, còn targetColumn.cards = dndOrderedCards mới là dòng thực sự thay thế danh sách card bằng thứ tự mới.
                    return nextColumns
                })
                //call api
                moveCardInTheSameColumn(dndOrderedCards, dndOrderedCards.map(card => card._id), oldColumnWhenDraggingCard._id)


            }


        }

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            //nếu kéo qua column khác với vị trí cũ
            if (active.id !== over.id) {
                //lấy vị trí cũ (từ thằng active)
                const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
                //lấy vị trí mới (từ thằng over)
                const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
                //sắp xếp lại mảng
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
                // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

                // console.log('dndOrderedColumns: ', dndOrderedColumns)
                // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

                // Vẫn gọi update State ở đây để tránh delay hoặc Flickering giao diện lúc kéo thả cần phải chờ gọi API (small trick)
                setOrderedColumns(dndOrderedColumns)
                /**
                 * Gọi lên props function moveColumns nằm ở component cha cao nhất (boards/_id.jsx)
                 * Lưu ý: Về sau ở học phần MERN Stack Advance nâng cao học trực tiếp mình sẽ với mình thì chúng ta sẽ đưa dữ liệu Board ra ngoài Redux Global Store,
                 * và lúc này chúng ta có thể gọi luôn API ở đây là xong thay vì phải lần lượt gọi ngược lên những component cha phía bên trên. (Đối với component con nằm càng sâu thì càng khổ :D)
                 * - Với việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều.
                */
                moveColumns(dndOrderedColumns)

            }
        }
        //reset state drag
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumnWhenDraggingCard(null)
    }

    /**
      * Animation khi thả (Drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ Overlay (video 32)
      */
    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
    }

    // Chúng ta sẽ custom lại chiến lược / thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giữa nhiều columns (video 37 fix bug quan trọng)
    // args = arguments = Các Đối số, tham số
    const collisionDetectionStrategy = useCallback((args) => {
        // Trường hợp kéo column thì dùng thuật toán closestCorners là chuẩn nhất
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({ ...args })
        }

        // Tìm các điểm giao nhau, va chạm, trả về một mảng các va chạm - intersections với con trỏ
        const pointerIntersections = pointerWithin(args)

        // Video 37.1: Nếu pointerIntersections là mảng rỗng, return luôn không làm gì hết.
        // Fix triệt để cái bug flickering của thư viện Dnd-kit trong trường hợp sau:
        //  - Kéo một cái card có image cover lớn và kéo lên phía trên cùng ra khỏi khu vực kéo thả
        if (!pointerIntersections?.length) return

        // // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây (không cần bước này nữa - video 37.1)
        // const intersections = !!pointerIntersections?.length
        //   ? pointerIntersections
        //   : rectIntersection(args)

        // Tìm overId đầu tiên trong đám pointerIntersections ở trên
        let overId = getFirstCollision(pointerIntersections, 'id')
        if (overId) {
            // Video 37: Đoạn này để fix cái vụ flickering nhé.
            // Nếu cái over nó là column thì sẽ tìm tới cái cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được. Tuy nhiên ở đây dùng closestCorners mình thấy mượt mà hơn.
            // Nếu không có đoạn checkColumn này thì bug flickering vẫn fix đc rồi nhưng mà kéo thả sẽ rất giật giật lag.
            const checkColumn = orderedColumns.find(column => column._id === overId)
            if (checkColumn) {
                // console.log('overId before: ', overId)
                overId = closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(container => {
                        return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
                    })
                })[0]?.id
                // console.log('overId after: ', overId)
            }

            lastOverId.current = overId
            return [{ id: overId }]
        }

        // Nếu overId là null thì trả về mảng rỗng - tránh bug crash trang
        return lastOverId.current ? [{ id: lastOverId.current }] : []
    }, [activeDragItemType, orderedColumns])

    return (
        <DndContext
            sensors={sensors}
            // Thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua Column được vì lúc này nó đang bị conflict giữa card và column), chúng ta sẽ dùng closestCorners thay vì closestCenter
            // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
            // Update video 37: nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu (vui lòng xem video 37 sẽ rõ)
            // collisionDetection={closestCorners}

            // Tự custom nâng cao thuật toán phát hiện va chạm (video fix bug số 37)
            collisionDetection={collisionDetectionStrategy}
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
                <ListColumns
                    columns={orderedColumns}
                />
                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}