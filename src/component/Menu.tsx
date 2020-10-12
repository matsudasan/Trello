import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ListState } from "../atom/atom"
import EditTitle from "./EditTitle"
import "../style/Menu.css"

type Props = {
    index: number
    title: string
    ChangeTitle:(text:string,index:number)=>void
    ChangeMenu:()=>void
}
const Menu: React.FC<Props> = ({ index, title,ChangeTitle,ChangeMenu }) => {
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
        console.log("閉じる")
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
            {open && <EditTitle listindex={index} ChangeModal={ChangeModal} title={title} ChangeTitle={ChangeTitle} ChangeMenu={ChangeMenu}/>}
        </>
    )
}

export default Menu