import { useState } from 'react'
import { QUESTIONS, LEVELS } from './questions.js'

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [count, setCount] = useState(10)
  const [quiz, setQuiz] = useState([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [wrong, setWrong] = useState([])

  function start({ from, to }) {
    const pool = shuffle(QUESTIONS.slice(from, to))
    setQuiz(count === 0 ? pool : pool.slice(0, count))
    setIndex(0)
    setPicked(null)
    setWrong([])
  }

  function choose(i) {
    if (picked !== null) return
    setPicked(i)
    if (i !== quiz[index].answer) setWrong(w => [...w, { ...quiz[index], picked: i }])
  }

  function next() {
    setIndex(n => n + 1)
    setPicked(null)
  }

  if (quiz.length === 0) {
    return (
      <main>
        <h1>React MCQ Quiz</h1>
        <label>
          Kitne sawal?{' '}
          <select value={count} onChange={e => setCount(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={0}>Poora level</option>
          </select>
        </label>
        {LEVELS.map(l => (
          <button key={l.name} onClick={() => start(l)}>{l.name}</button>
        ))}
      </main>
    )
  }

  if (index >= quiz.length) {
    return (
      <main>
        <h1>Score: {quiz.length - wrong.length} / {quiz.length}</h1>
        {wrong.map(q => (
          <section key={q.id}>
            <p><b>Q{q.id}. {q.text}</b></p>
            <p>Aap ka jawab: {q.options[q.picked]}</p>
            <p>Sahi jawab: {q.options[q.answer]}</p>
          </section>
        ))}
        <button onClick={() => setQuiz([])}>Dobara khelein</button>
      </main>
    )
  }

  const q = quiz[index]
  return (
    <main>
      <p>Sawal {index + 1} / {quiz.length}</p>
      <h2>{q.text}</h2>
      {q.options.map((option, i) => {
        let state = ''
        if (picked !== null && i === q.answer) state = 'correct'
        else if (picked === i) state = 'wrong'
        return (
          <button key={i} className={state} onClick={() => choose(i)}>
            {'ABCD'[i]}) {option}
          </button>
        )
      })}
      {picked !== null && <button className="next" onClick={next}>Next</button>}
      <button onClick={() => setQuiz([])}>Home</button>
    </main>
  )
}
