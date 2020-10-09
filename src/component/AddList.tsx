import React, { useState,useRef,useEffect } from 'react';
import { useRecoilState } from "recoil";
import { ListState } from "../atom/atom"
import "../style/AddList.css"

type Props = {
    ChangeOpen: () => void
    open:boolean
}

const AddList: React.FC<Props> = ({ ChangeOpen,open }) => {
    const [list, setList] = useRecoilState(ListState)
    const [title, setTitle] = useState<string>("")
    const toggleContainer = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>

    useEffect(() => {
        window.addEventListener('click', onClickOutsideHandler);
        return () => {
            window.removeEventListener('click', onClickOutsideHandler);
        }
    })

    const onClickOutsideHandler = (e:any) => {
        if (open && !toggleContainer.current.contains(e.target)) {
            ChangeOpen()
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const AddList = () => {
        if(title===""){
            alert("リスト名が空白です")
        }else{
            setList(prevState => [...prevState, { title, content: [] }])
            ChangeOpen()
        }
    }

    return (
        <div className="add-list" ref={toggleContainer}>
            <input type="text" value={title} onChange={onChange} placeholder="リスト名" />
            <div className="button">
                <button onClick={AddList}>追加</button>
                <i className="fas fa-2x fa-times" onClick={() => ChangeOpen()}></i>
            </div>
        </div>
    )
}

export default AddList