'use strict'
const fs = require('fs')

function solution1(data) {
  const awards = new Map()
  awards.set(')', 3)
  awards.set('}', 1197)
  awards.set(']', 57)
  awards.set('>', 25137)

  const match = new Map()
  match.set(')', '(')
  match.set('}', '{')
  match.set(']', '[')
  match.set('>', '<')

  let result = 0
  data.forEach((line) => {
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

    let symb = findWrong(line)

    if (symb) {
      result += awards.get(symb)
    }
  })
  return result
}

function solution2(data) {}

const data = fs
  .readFileSync(`${__dirname}/advent_10_input.txt`, 'utf8')
  .split('\n')

console.log(solution1(data))
console.log(solution2(data))
