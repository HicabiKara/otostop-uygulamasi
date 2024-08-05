import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    initializeCount(state, action: PayloadAction<number>) {
      state.value = action.payload
    },
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
  },
})

export const { initializeCount, increment, decrement } = counterSlice.actions
export default counterSlice.reducer