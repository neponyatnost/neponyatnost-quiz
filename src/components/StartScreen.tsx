import { FC } from 'react'
import { ActionType, Actions } from './App'

interface StartScreenProps {
  numQuestions: number
  dispatch: React.Dispatch<Actions>
}

const StartScreen: FC<StartScreenProps> = ({ numQuestions, dispatch }) => {
  return (
    <div className='start'>
      <h2>Welcome to THE REACT QUIZ</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ActionType.GameStarted, payload: [] })}
      >
        Let's start!
      </button>
    </div>
  )
}

export default StartScreen
