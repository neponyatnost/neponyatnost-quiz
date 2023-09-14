import { FC } from 'react'
import { IQuestion } from '../models/question'
import { Actions } from './App'
import Options from './Options'

interface QuestionProps {
  question: IQuestion
  dispatch: React.Dispatch<Actions>
  answer: number | null
}

const Question: FC<QuestionProps> = ({ question, dispatch, answer }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Question
