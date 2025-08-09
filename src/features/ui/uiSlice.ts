import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ModalType = "update-profile" | "change-password" | "login-required" | null;

interface UIState {
  activeModal: ModalType
}

const initialState: UIState = {
  activeModal: null,
}

const uiSlice =createSlice({
    name:"ui",
    initialState,
    reducers:{
        openModal:(state,action:PayloadAction<ModalType>)=>{
            state.activeModal=action.payload
        },
        closeModal:(state)=>{
            state.activeModal=null
        },
    }
})

export const {openModal,closeModal}=uiSlice.actions

export default uiSlice.reducer