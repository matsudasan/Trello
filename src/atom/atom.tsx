import { atom } from 'recoil';
export type ListStated = {
    title: string
    tasks: number[]
}
const initListState: ListStated[] = [
    {
        title: "リスト1",
        tasks: [0]
    }
]
export const ListState = atom({
    key: "liststate",
    default: initListState
})

export type TaskStated = {
    id: number
    content: string
}
const inittaskState: TaskStated[] = [
    { id: 0, content: "リスト1" }
]
export const TaskState = atom({
    key: "taskstate",
    default: inittaskState
})

export const TaskNumber = atom({
    key: "tasknumber",
    default: 1
})
