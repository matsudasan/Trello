import React, { useRef, useState } from "react";
import "../style/EditCard.css"
import { StringDecoder } from "string_decoder";

type Props={
    content:string
    ChangeEdit:()=>void
    ChangeHidden:()=>void
    DeleteCard:(index:number)=>void
    Save:(index:number,content:string)=>void
    id:number
}
const EditCard: React.FC<Props> = ({content,ChangeEdit,ChangeHidden,DeleteCard,Save,id}) => {
    const [text,setText]=useState(content)

    const Input=(e:any)=>{
        setText(e.target.value)
    }

    return (
        <div className="edit-card">
            <input type="text" value={text} onChange={Input} autoFocus={true} />
            <div className="text">
                <p className="save" onClick={()=>Save(id,text)}>保存</p>
                <p className="delete" onClick={()=>DeleteCard(id)}>削除</p>
            </div>
        </div>
    )
}

export default EditCard