import { atom } from "recoil";



export const tokenState = atom({
    key : "token",
    default: ""
})

export const emailState = atom({
    key: "email",
    default: ""
})

export const pageState = atom({
    key: "page",
    default: "mybooks"
})

