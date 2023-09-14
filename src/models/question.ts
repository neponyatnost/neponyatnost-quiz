export interface IQuestionsRootState {
  questions: IQuestion[]
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
  index: number
  answer: number | null
  points: number
  highscore: number
  secondsRemaining: number
}

export interface IQuestion {
  question: string
  options: Array<string>
  correctOption: number
  points: number
}
