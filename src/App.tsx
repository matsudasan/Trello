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
    const { destination, source, draggableId } = result;

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    console.log(result)

    const mylist=list[source.droppableId]
    const newTaskIds=mylist.tasks.filter((i,index)=>index!==source.index)
    newTaskIds.splice(destination.index,0,mylist.tasks[source.index])
    console.log(mylist)

    //source.indexは持っているカードのindex
    //source.droppableIdは移動元のリストのindex
    //destination.droppableId移動先のリストのindex
    //destination.indexは移動先のカードのindex

    const List = JSON.parse(JSON.stringify(list))
    List[source.droppableId].tasks=newTaskIds
    console.log(List)
    setList(List)
  }

  console.log(list)

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
              const tasks=item.tasks.map(taskId=>task[taskId])
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
