import React, { useState } from 'react';
import { useRecoilState } from "recoil";
import { ListState, ListStated, TaskState } from "./atom/atom"
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from "./component/List"
import AddList from "./component/AddList"
import './App.css';
import { findByTestId } from '@testing-library/react';


const App: React.FC = () => {
  const [list, setList] = useRecoilState(ListState)
  const [task, setTask] = useRecoilState(TaskState)
  const [open, setOpen] = useState(false)

  const ChangeOpen = () => {
    setOpen(!open)
  }


  const onDragEnd = (result: any) => {
    //source.indexは持っているカードのindex
    //source.droppableIdは移動元のリストのindex
    //destination.droppableId移動先のリストのindex
    //destination.indexは移動先のカードのindex
    const { destination, source, draggableId } = result;

    console.log(result)

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const List = JSON.parse(JSON.stringify(list))
    const startlist = List[source.droppableId]
    const finishlist = List[destination.droppableId]

    if (startlist === finishlist) {
      const newTaskIds = startlist.tasks.filter((i:any, index:number) => index !== source.index)
      newTaskIds.splice(destination.index, 0, startlist.tasks[source.index])

      List[source.droppableId].tasks = newTaskIds
      setList(List)
    } else {
      const startTaskIds = startlist.tasks.filter((i:any, index:number) => index !== source.index)

      const finishTaskIds = finishlist.tasks
      finishTaskIds.splice(destination.index, 0, startlist.tasks[source.index])

      List[source.droppableId].tasks = startTaskIds
      List[destination.droppableId].tasks = finishTaskIds
      setList(List)
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
              //const tasks = task.filter(i => item.tasks.includes(i.id))
              const tasks = item.tasks.map(taskId => task[taskId])
              return <List list={item} listindex={index} key={index} tasks={tasks} />
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
