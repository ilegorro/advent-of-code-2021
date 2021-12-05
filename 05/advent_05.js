'use strict'
const fs = require('fs')

function solution1(data) {
  const map = new Map()
  data.forEach((element) => {
    const [x1, y1, x2, y2] = element
      .split(' -> ')
      .map((el) => {
        return el.split(',')
      })
      .flat()
      .map((el) => +el)
    if (x1 === x2 || y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
          const point = `${i},${j}`
          const pointValue = map.get(point) || 0
          map.set(point, pointValue + 1)
        }
      }
    }
  })
  const result = [...map.values()].filter((el) => el > 1).length
  return result
}

function solution2(data) {
  const map = new Map()
  data.forEach((element) => {
    const [x1, y1, x2, y2] = element
      .split(' -> ')
      .map((el) => {
        return el.split(',')
      })
      .flat()
      .map((el) => +el)
    if (x1 === x2 || y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
          const point = `${i},${j}`
          const pointValue = map.get(point) || 0
          map.set(point, pointValue + 1)
        }
      }
    } else if (Math.abs(x2 - x1) === Math.abs(y2 - y1)) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        const y = (x2 * y1 - x1 * y2 - (y1 - y2) * x) / (x2 - x1)
        const point = `${x},${y}`
        const pointValue = map.get(point) || 0
        map.set(point, pointValue + 1)
      }
    }
  })
  const result = [...map.values()].filter((el) => el > 1).length
  return result
}

const data = fs
  .readFileSync(`${__dirname}/advent_05_input.txt`, 'utf8')
  .split('\n')

console.log(solution1(data))
console.log(solution2(data))
