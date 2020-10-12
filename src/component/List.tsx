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
    listindex: number
    tasks: TaskStated[]
}

const List: React.FC<List> = ({ list, listindex, tasks }) => {
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
            list[listindex].tasks.push(number)
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

    return (
        <div className="list">
            <div className="title">
                <h3>{list.title}</h3>
                <div className="menu" ref={toggleContainer}>
                    <div className="button" onClick={() => setOpen(!open)}>
                        <i className="fas fa-ellipsis-h" ></i>
                    </div>
                    {open && (
                        <div className="menu-list" >
                            <Menu index={listindex} title={list.title} ChangeTitle={ChangeTitle} />
                        </div>
                    )}
                </div>
            </div>
            <Droppable droppableId={String(listindex)}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-list"
                    >
                        {tasks.map((card, index) => {
                            return (
                                <Card
                                    card={card}
                                    id={card.id}
                                    cardindex={index}
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
    )
}

export default List