import raw from './questions.txt?raw'
import { ANSWERS } from './answers.js'

export const QUESTIONS = raw.trim().split(/\r?\n/).map((line, i) => {
  const [text, ...options] = line.split('~')
  return { id: i + 1, text, options, answer: 'ABCD'.indexOf(ANSWERS[i]) }
})

export const LEVELS = [
  { name: 'Beginner (1-50)', from: 0, to: 50 },
  { name: 'Intermediate (51-100)', from: 50, to: 100 },
  { name: 'Advanced (101-200)', from: 100, to: 200 },
  { name: 'Sab (1-200)', from: 0, to: 200 },
]
