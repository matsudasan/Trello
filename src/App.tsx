import React, { useState } from 'react';
import { useRecoilState  } from "recoil";
import {ListState,Listed} from "./atom/atom"
import { useDrag, useDrop } from "react-dnd";
import List from "./component/List"
import AddList from "./component/AddList"
import './App.css';


const App: React.FC = () => {
  const [list,setList]=useRecoilState(ListState)
  const [open, setOpen] = useState(false)

  const ChangeOpen = () => {
    setOpen(!open)
  }

  return (
    <div className="app">
      {list.map((item: Listed, index: number) => {
        return <List list={item} index={index} key={index} />
      })}
      {!open &&
        <div className="add" onClick={ChangeOpen}>
          <i className="fas fa-plus"></i>リストを追加
      </div>}
      {open && <AddList ChangeOpen={ChangeOpen} open={open} />}
    </div>
  );
}

export default App;
