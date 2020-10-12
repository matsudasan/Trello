import { atom } from 'recoil';
export type ListStated = {
    title: string
    tasks: number[]
}
const initListState: ListStated[] = [
    {
        title: "リスト1",
        tasks: [0, 1, 2]
    },
    {
        title: "リスト2",
        tasks: [3,4,5]
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
    { id: 0, content: "カード0" },
    { id: 1, content: "カード1" },
    { id: 2, content: "カード2" },
    { id: 3, content: "カード3" },
    { id: 4, content: "カード4" },
    { id: 5, content: "カード5" },
]
export const TaskState = atom({
    key: "taskstate",
    default: inittaskState
})

export const TaskNumber = atom({
    key: "tasknumber",
    default: 3
})
