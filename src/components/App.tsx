import { Reducer, useEffect, useReducer } from 'react'
import { IQuestion, IQuestionsRootState } from '../models/question'
import Error from './Error'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Header from './Header'
import Loader from './Loader'
import Main from './Main'
import NextButton from './NextButton'
import Progress from './Progress'
import Question from './Question'
import StartScreen from './StartScreen'
import Timer from './Timer'

const initialState: IQuestionsRootState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
}

export enum ActionType {
  DataReceived = 'dataReceived',
  DataFailed = 'dataFailed',
  GameStarted = 'gameStarted',
  NewAnswer = 'newAnswer',
  NextQuestion = 'nextQuestion',
  FinishQuiz = 'finishQuiz',
  RestartQuiz = 'restartQuiz',
  Timer = 'timer',
  Status = 'status',
}

export interface QuestionsAction {
  type:
    | ActionType.DataReceived
    | ActionType.DataFailed
    | ActionType.GameStarted
    | ActionType.NewAnswer
    | ActionType.NextQuestion
    | ActionType.FinishQuiz
    | ActionType.RestartQuiz
    | ActionType.Timer
  payload: any
}

interface StatusAction {
  type: ActionType.Status
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
}

export type Actions = QuestionsAction | StatusAction

const reducer: Reducer<IQuestionsRootState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionType.DataReceived:
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case ActionType.DataFailed:
      return {
        ...state,
        questions: [],
        status: 'error',
      }
    case ActionType.GameStarted:
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.secondsRemaining,
      }
    case ActionType.NewAnswer:
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question!.correctOption
            ? state.points + question!.points
            : state.points,
      }
    case ActionType.NextQuestion:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case ActionType.FinishQuiz:
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case ActionType.RestartQuiz:
      return {
        ...state,
        status: 'ready',
        answer: null,
        index: 0,
        points: 0,
        secondsRemaining: state.secondsRemaining,
      }
    case ActionType.Timer:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const numQuestions = state.questions.length
  const maxPossiblePoints = state.questions.reduce((a, b) => a + b.points, 0)

  useEffect(() => {
    fetch('http://localhost:8080/questions')
      .then((res) => res.json())
      .then((data: IQuestion[]) =>
        dispatch({ type: ActionType.DataReceived, payload: data })
      )
      .catch((error: Error) =>
        dispatch({ type: ActionType.DataFailed, payload: [] })
      )
  }, [])

  return (
    <div className='app'>
      <Header />
      <Main>
        {state.status === 'loading' && <Loader />}
        {state.status === 'error' && <Error />}
        {state.status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === 'active' && (
          <>
            <Progress
              index={state.index}
              points={state.points}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
              answer={state.answer}
            />
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={state.secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                index={state.index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {state.status === 'finished' && (
          <FinishScreen
            points={state.points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={state.highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App
