import React, {useState } from "react";
import "../style/AddCard.css"

type Props={
    ChangeAdd:()=>void
    AddCard:(text:string)=>void
}
const Addcard: React.FC<Props> = ({ChangeAdd,AddCard}) => {
    const [text,setText]=useState("")

    const Input=(e:any)=>{
        setText(e.target.value)
    }

    return (
        <div className="card-add">
            <input type="text" autoFocus={true} value={text} onChange={Input} placeholder="入力できます"/>
            <div className="text">
                <p onClick={()=>AddCard(text)}>追加</p>
                <p onClick={()=>ChangeAdd()}>キャンセル</p>
            </div>
        </div>
    )
}

export default Addcard