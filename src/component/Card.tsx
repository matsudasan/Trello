import React, { useRef, useState, useEffect } from "react";
import { Carded } from "../atom/atom"
import EditCard from "./EditCard"
import "../style/Card.css"
type Props = {
    card: Carded
    index: number
    DeleteCard:(index:number)=>void
    Save:(index:number,content:string)=>void
}
const Card: React.FC<Props> = ({ card, index,DeleteCard,Save }) => {
    const [carded, setCarded] = useState(card)
    const [open, setOpen] = useState(false)
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

    const ChangeEdit=()=>{
        setEdit(!edit)
    }

    const ChangeHidden=()=>{
        setHidden(!hidden)
    }

    let Carded
    if (edit) {
        Carded =
            <div ref={toggleContainer}>
                <EditCard content={carded.text} ChangeEdit={ChangeEdit} ChangeHidden={ChangeHidden} DeleteCard={DeleteCard} Save={Save} index={index}/>
            </div>
    } else {
        Carded =
            <div className="card" onMouseEnter={() => setHidden(true)} onMouseLeave={() => setHidden(false)}>
                {carded.text}
                {hidden &&
                    <div className="pen" >
                        <i className="fas fa-pen" onClick={()=>ChangeEdit()}></i>
                    </div>
                }
            </div>
    }

    return (
        <>
            {Carded}
        </>
    )
}

export default Card