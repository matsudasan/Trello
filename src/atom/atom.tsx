import { atom } from 'recoil';

export type Listed = {
    title: string
    content: Carded[]
}

export type Carded = {
    id: number
    text: string
}

const initState:Listed[]=
[
    {
        title:"リスト1",
        content:[
            {id:0,text:"カード1"}
        ]
    }
]


export const ListState = atom({
    key: "liststate",
    default: initState
})