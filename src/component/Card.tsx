import React, { useRef, useState, useEffect } from "react";
import { TaskStated } from "../atom/atom"
import { Draggable,Droppable } from 'react-beautiful-dnd';
import EditCard from "./EditCard"
import "../style/Card.css"

type Props = {
    card: TaskStated
    id: number
    cardindex: number
    DeleteCard: (index: number) => void
    Save: (index: number, content: string) => void
}

const Card: React.FC<Props> = ({ card, id, cardindex, DeleteCard, Save }) => {
    const [hidden, setHidden] = useState(false)
    const [edit, setEdit] = useState(false)
    const toggleContainer = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>

    useEffect(() => {
        window.addEventListener('click', onClickOutsideHandler);
        return () => {
            window.removeEventListener('click', onClickOutsideHandler);
        }
    })

    const onClickOutsideHandler = (e: any) => {
        if (edit && !toggleContainer.current.contains(e.target)) {
            setEdit(!edit)
        }
    }

    const ChangeEdit = () => {
        setEdit(!edit)
    }

    const ChangeHidden = () => {
        setHidden(!hidden)
    }

    const onPen = () => {
        ChangeEdit()
        setHidden(false)
    }

    const onSave = (id: number, text: string) => {
        Save(id, text)
        window.removeEventListener('click', onClickOutsideHandler);
        ChangeEdit()
    }

    let Carded
    if (edit) {
        Carded =
            <div ref={toggleContainer}>
                <EditCard content={card.content} ChangeEdit={ChangeEdit} ChangeHidden={ChangeHidden} DeleteCard={DeleteCard} Save={onSave} id={id} />
            </div>

    } else {
        Carded =
            <Draggable draggableId={String(id)} index={cardindex} >
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="card"
                            onMouseEnter={() => setHidden(true)}
                            onMouseLeave={() => setHidden(false)}
                        >
                            {card.content}
                            {hidden &&
                                <div className="pen" >
                                    <i className="fas fa-pen" onClick={onPen}></i>
                                </div>
                            }
                        </div>
                    </div>
                )}
            </Draggable>
    }

    return (
        <>
            {Carded}
        </>
    )
}

export default Card