'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/features/store'
import { increment, decrement } from '@/features/count/countSlice'

const Counter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const count = useSelector((state: RootState) => state.counter.value)

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default Counter