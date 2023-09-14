import { FC } from 'react'
import { ActionType, Actions } from './App'

interface FinishScreenProps {
  points: number
  maxPossiblePoints: number
  highscore: number
  dispatch: React.Dispatch<Actions>
}

const FinishScreen: FC<FinishScreenProps> = ({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}) => {
  let emoji: string = ''
  const percentage = (points / maxPossiblePoints) * 100

  if (percentage === 100) emoji = '💯🥇😲'
  if (percentage >= 80 && percentage < 100) emoji = '👍😎🎉'
  if (percentage >= 50 && percentage < 80) emoji = '😉👌👀'
  if (percentage >= 0 && percentage < 50) emoji = '😥'

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>Highscore: {highscore} points</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ActionType.RestartQuiz, payload: [] })}
      >
        Restart Quiz
      </button>
    </>
  )
}

export default FinishScreen
