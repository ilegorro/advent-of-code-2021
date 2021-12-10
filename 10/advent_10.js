'use strict'
const fs = require('fs')

function solution(data) {
  let result1 = 0
  let result2 = 0
  const scores = []
  data.forEach((line) => {
    let symb = findWrong(line)
    if (symb) {
      // incorrect
      result1 += awards1.get(symb)
    } else {
      // incomplete
      let closingSeq = []
      for (let i = 0; i < line.length; i++) {
        if (open.includes(line[i])) {
          closingSeq.push(match.get(line[i]))
        } else {
          closingSeq.pop()
        }
      }
      let score = 0
      closingSeq.reverse().forEach((el) => {
        score = score * 5 + awards2.get(el)
      })
      scores.push(score)
    }
  })
  scores.sort((a, b) => a - b)
  result2 = scores[(scores.length - 1) / 2]

  return { result1, result2 }
}

const awards1 = new Map()
awards1.set(')', 3)
awards1.set('}', 1197)
awards1.set(']', 57)
awards1.set('>', 25137)
const awards2 = new Map()
awards2.set(')', 1)
awards2.set(']', 2)
awards2.set('}', 3)
awards2.set('>', 4)

const open = ['(', '{', '[', '<']
const match = new Map()
match.set('(', ')')
match.set('{', '}')
match.set('[', ']')
match.set('<', '>')
match.set(')', '(')
match.set('}', '{')
match.set(']', '[')
match.set('>', '<')

const findWrong = (group) => {
  const firstClosingBraces = new Map()
  firstClosingBraces.set(')', group.indexOf(')'))
  firstClosingBraces.set('}', group.indexOf('}'))
  firstClosingBraces.set(']', group.indexOf(']'))
  firstClosingBraces.set('>', group.indexOf('>'))
  let closingPos = Number.MAX_SAFE_INTEGER
  let closingBrace = null
  firstClosingBraces.forEach((value, key) => {
    if (value >= 0 && value < closingPos) {
      closingPos = value
      closingBrace = key
    }
  })
  if (!closingBrace) {
    return undefined
  } else if (closingPos === 0) {
    return closingBrace
  } else if (group[closingPos - 1] !== match.get(closingBrace)) {
    return closingBrace
  } else {
    return findWrong(
      group.slice(0, closingPos - 1) + group.slice(closingPos + 1)
    )
  }
}

const data = fs
  .readFileSync(`${__dirname}/advent_10_input.txt`, 'utf8')
  .split('\n')

console.log(solution(data))
