import { FC, useEffect } from 'react'
import { ActionType, Actions } from './App'

interface TimerProps {
  dispatch: React.Dispatch<Actions>
  secondsRemaining: number
}

const Timer: FC<TimerProps> = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: ActionType.Timer, payload: [] })
    }, 1000)

    return () => clearInterval(id)
  }, [dispatch])

  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  )
}

export default Timer
