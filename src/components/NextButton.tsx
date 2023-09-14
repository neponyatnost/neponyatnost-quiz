import { FC } from 'react'
import { ActionType, Actions } from './App'

interface NextButtonProps {
  dispatch: React.Dispatch<Actions>
  answer: number | null
  index: number
  numQuestions: number
}

const NextButton: FC<NextButtonProps> = ({
  dispatch,
  answer,
  index,
  numQuestions,
}) => {
  if (answer === null) return null

  if (index < numQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ActionType.NextQuestion, payload: [] })}
      >
        Next Question
      </button>
    )
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ActionType.FinishQuiz, payload: [] })}
      >
        Finish Quiz
      </button>
    )
  }
  return null
}

export default NextButton
