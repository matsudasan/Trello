import React, { useRef, useState, useEffect, useCallback } from "react";
import Card from "./Card"
import Menu from "./Menu"
import Addcard from "./AddCard"
import { ListStated, TaskStated, TaskState, ListState, TaskNumber } from "../atom/atom"
import { useRecoilState } from "recoil";
import "../style/List.css"
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';

type List = {
    list: ListStated
    index: number
    tasks: TaskStated[]
}

const List: React.FC<List> = ({ list, index, tasks }) => {
    const [tasked, setTask] = useRecoilState(TaskState)
    const [listed, setList] = useRecoilState(ListState)
    const [number, setNumber] = useRecoilState(TaskNumber)
    const [open, setOpen] = useState(false)
    const [add, setAdd] = useState(false)
    const toggleContainer = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>

    useEffect(() => {
        window.addEventListener('click', onClickOutsideHandler);
        return () => {
            window.removeEventListener('click', onClickOutsideHandler);
        }
    })

    const onClickOutsideHandler = (e: any) => {
        if (open && !toggleContainer.current.contains(e.target)) {
            setOpen(false)
        }
    }

    const ChangeAdd = () => {
        setAdd(!add)
    }

    const AddCard = (text: string) => {
        if (text === "") {
            alert("空白です")
        } else {
            const task = { id: number, content: text }
            const list = JSON.parse(JSON.stringify(listed))
            list[index].tasks.push(number)
            setList(list)
            setTask(prevState => [...prevState, task])
            setNumber(prevState => { return prevState + 1 })
            setAdd(!add)
        }
    }

    const DeleteCard = (id: number) => {
        setTask(prevState => {
            const newtasklist = prevState.filter(i => i.id !== id)
            return [...newtasklist]
        })
    }

    const Save = (id: number, text: string) => {
        const task = JSON.parse(JSON.stringify(tasked))
        const index = tasked.findIndex(i => i.id === id)
        task[index].content = text
        setTask(task)
    }

    const ChangeTitle = (text: string) => {
    }

    const onDragEnd = (result: any) => {
        const { destination, source, draggableID } = result;

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        const dragtask = tasked[source.index]
        const droptask = tasked[destination.index]
        console.log(dragtask)
        console.log(droptask)
        setTask(prevState => {
            const newitem = prevState.filter((i, index) => index !== source.index)
            newitem.splice(destination.index, 0, dragtask)
            return [...newitem]
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
                    <div className="list">
                        <div className="title">
                            <h3>{list.title}</h3>
                            <div className="menu" ref={toggleContainer}>
                                <div className="button" onClick={() => setOpen(!open)}>
                                    <i className="fas fa-ellipsis-h" ></i>
                                </div>
                                {open && (
                                    <div className="menu-list" >
                                        <Menu index={index} title={list.title} ChangeTitle={ChangeTitle} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Droppable droppableId={String(index)} type="task">
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {tasks.map((card, index) => {
                                        return (
                                            <Card
                                                card={card}
                                                id={card.id}
                                                index={index}
                                                key={card.id}
                                                DeleteCard={DeleteCard}
                                                Save={Save}
                                            />
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        {add && <Addcard ChangeAdd={ChangeAdd} AddCard={AddCard} />}
                        {!add &&
                            <div className="add-card" onClick={ChangeAdd}>
                                カードを追加
                    </div>
                        }
                    </div>
        </DragDropContext>
    )
}

export default List