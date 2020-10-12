import { atom } from 'recoil';
export type ListStated = {
    title: string
    tasks: number[]
}
const initListState: ListStated[] = [
    {
        title: "リスト1",
        tasks: [0, 1, 2]
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
    { id: 0, content: "カード1" },
    { id: 1, content: "カード2" },
    { id: 2, content: "カード3" }
]
export const TaskState = atom({
    key: "taskstate",
    default: inittaskState
})

export const TaskNumber = atom({
    key: "tasknumber",
    default: 3
})
