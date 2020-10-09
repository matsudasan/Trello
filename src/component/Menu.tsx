import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ListState } from "../atom/atom"
import EditTitle from "./EditTitle"
import "../style/Menu.css"

type Props = {
    index: number
    title: string
    ChangeTitle:(text:string)=>void
}
const Menu: React.FC<Props> = ({ index, title,ChangeTitle }) => {
    const setList = useSetRecoilState(ListState)
    const [open, setOpen] = useState(false)

    const RemoveList = (myindex: number) => {
        setList(prevState => {
            const newlist = prevState.filter((i, index) => index !== myindex)
            return [...newlist]
        })
    }

    const ChangeModal=()=>{
        setOpen(!open)
    }
    return (
        <>
            <div className="menus">
                <div className="change" onClick={() => setOpen(!open)}>
                    <i className="fas fa-pen"></i>
                    <p>タイトルを変更</p>
                </div>
                <div className="remove" onClick={() => RemoveList(index)}>
                    <i className="fas fa-trash"></i>
                    <p>リストを削除</p>
                </div>
            </div>
            {open && <EditTitle ChangeModal={ChangeModal} title={title} ChangeTitle={ChangeTitle}/>}
        </>
    )
}

export default Menu