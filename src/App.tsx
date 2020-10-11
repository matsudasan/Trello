import React, { useState } from 'react';
import { useRecoilState } from "recoil";
import { ListState, ListStated, TaskState } from "./atom/atom"
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from "./component/List"
import AddList from "./component/AddList"
import './App.css';


const App: React.FC = () => {
  const [list, setList] = useRecoilState(ListState)
  const [task, setTask] = useRecoilState(TaskState)
  const [open, setOpen] = useState(false)

  const ChangeOpen = () => {
    setOpen(!open)
  }

  const onDragEnd = (result: any) => {
    const { destination, source, draggableID } = result;

    if (!destination) {
      return
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable 
        droppableId="all-list"
        direction="horizontal"
        type="column"
      >
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="app">
            {list.map((item: ListStated, index: number) => {
              const tasks = task.filter(i => item.tasks.includes(i.id))
              return <List list={item} index={index} key={index} tasks={tasks} />
            })}
            {!open &&
              <div className="add" onClick={ChangeOpen}>
                <i className="fas fa-plus"></i>リストを追加
              </div>}
            {open && <AddList ChangeOpen={ChangeOpen} open={open} />}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
