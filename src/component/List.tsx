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
            setNumber(number+1)
            setAdd(!add)
        }
    }

    const DeleteCard = (id: number) => {
        const list = JSON.parse(JSON.stringify(listed))
        const newtaskIds=list[listindex].tasks.filter((i:number) => i !== id)
        list[listindex].tasks=newtaskIds
        setList(list)
        
        const task=JSON.parse(JSON.stringify(tasked))
        const newtask=task.filter((i:{id:number,content:string}) => i.id !== id)
        setTask(newtask)

    }

    const Save = (id: number, text: string) => {
        const task = JSON.parse(JSON.stringify(tasked))
        const index = tasked.findIndex(i => i.id === id)
        task[index].content = text
        setTask(task)
    }

    const ChangeTitle = (text: string,index:number) => {
        const list = JSON.parse(JSON.stringify(listed))
        list[index].title=text
        setList(list)
    }

    const ChangeMenu=()=>{
        setOpen(!open)
    }

    return (
        <Draggable draggableId={"list"+listindex} index={listindex}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="list"
                >
                    <div
                        {...provided.dragHandleProps}
                        className="title"
                    >
                        <h3>{list.title}</h3>
                        <div className="menu" ref={toggleContainer}>
                            <div className="button" onClick={ChangeMenu}>
                                <i className="fas fa-ellipsis-h" ></i>
                            </div>
                            {open && (
                                <div className="menu-list" >
                                    <Menu index={listindex} title={list.title} ChangeTitle={ChangeTitle} ChangeMenu={ChangeMenu} />
                                </div>
                            )}
                        </div>
                    </div>
                    <Droppable droppableId={String(listindex)} type="task">
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
            )}
        </Draggable>
    )
}

export default List