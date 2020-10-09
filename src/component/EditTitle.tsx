import React, { useRef, useState } from "react";
import { ListState } from "../atom/atom"
import "../style/EditTitle.css"
type Props={
    ChangeModal:()=>void
    ChangeTitle:(text:string)=>void
    title:string
}
const Modal:React.FC<Props> = ({ChangeModal,title,ChangeTitle}) => {
    const [text,setText]=useState(title)

    const Back=(e:any)=>{
        e.stopPropagation();
    }

    const Input=(e:any)=>{
        setText(e.target.value)
    }
    const Save=()=>{
        ChangeTitle(text)
        ChangeModal()
    }

    return (
        <div className="background" onClick={()=>ChangeModal()}>
            <div className="modal" onClick={Back}>
                <p>新しいタイトル</p>
                <input type="text" value={text} onChange={Input}></input>
                <button onClick={()=>Save()}>保存</button>
            </div>
        </div>
    )
}

export default Modal