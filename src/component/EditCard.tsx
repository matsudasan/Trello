import React, { useRef, useState } from "react";
import "../style/EditCard.css"

type Props={
    content:string
    ChangeEdit:()=>void
    ChangeHidden:()=>void
    DeleteCard:(index:number)=>void
    Save:(index:number,content:string)=>void
    index:number
}
const EditCard: React.FC<Props> = ({content,ChangeEdit,ChangeHidden,DeleteCard,Save,index}) => {
    const [text,setText]=useState(content)

    const Input=(e:any)=>{
        setText(e.target.value)
    }

    const Cancel=()=>{
        ChangeEdit()
        ChangeHidden()
    }
    return (
        <div className="edit-card">
            <input type="text" value={text} onChange={Input} autoFocus={true} />
            <div className="text">
                <p className="save" 
                onClick={()=>{
                    Save(index,text)
                    Cancel()
                    }}>
                    保存</p>
                <p className="delete" onClick={()=>DeleteCard(index)}>削除</p>
                <p className="cancel" onClick={Cancel}>キャンセル</p>
            </div>
        </div>
    )
}

export default EditCard