import { FC } from 'react'
import { IQuestion } from '../models/question'
import { ActionType, Actions } from './App'

interface OptionsProps {
  question: IQuestion
  dispatch: React.Dispatch<Actions>
  answer: number | null
}

const Options: FC<OptionsProps> = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null

  return (
    <div className='options'>
      {question.options.map((o, i) => (
        <button
          className={`btn btn-option ${i === answer ? 'answer' : ''} ${
            hasAnswered
              ? i === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={o}
          onClick={() => dispatch({ type: ActionType.NewAnswer, payload: i })}
          disabled={hasAnswered}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export default Options
