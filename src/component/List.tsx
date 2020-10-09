import React, { useRef, useState, useEffect, useCallback } from "react";
import Card from "./Card"
import Menu from "./Menu"
import Addcard from "./AddCard"
import { Listed,Carded } from "../atom/atom"
import "../style/List.css"
import { useDrag, useDrop } from 'react-dnd'

type List = {
    list: Listed
    index: number
}

const List: React.FC<List> = ({ list, index }) => {
    const [listed, setListed] = useState<Listed>(list)
    const [open, setOpen] = useState(false)
    const [add, setAdd] = useState(false)
    const [number, setNumber] = useState(0)
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
        if(text===""){
            alert("空白です")
        }else{
            const newlist=listed.content
            newlist.push({id:number,text})
            setListed(prevState=>{
                prevState.content=newlist
                return{...prevState}
            })
            setNumber(number+1)
            setAdd(!add)
        }
    }

    const DeleteCard=(myindex:number)=>{
        const newlist=listed.content.filter((i,index)=>index!=myindex)
        setListed(prevState=>{
            prevState.content=newlist
            return{...prevState}
        })
    }

    const Save=(myindex:number,content:string)=>{
        setListed(prevState=>{
            prevState.content[myindex].text=content
            return{...prevState}
        })
    }

    const ChangeTitle=(text:string)=>{
        setListed(prevState=>{
            prevState.title=text
            return{...prevState}
        })
    }
        return (
            <>
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
                    {listed.content.map((card, index) => {
                        return <Card card={card} index={index} key={card.id} DeleteCard={DeleteCard} Save={Save} />
                    })}
                    {add && <Addcard ChangeAdd={ChangeAdd} AddCard={AddCard}  />}
                    {!add &&
                        <div className="add-card" onClick={ChangeAdd}>
                            カードを追加
                    </div>
                    }
                </div>
            </>
        )
    }

    export default List