const fs = require('fs')

function solution1(data) {
  const reducer = (acc, current) => {
    if (acc.prev && acc.prev < current) {
      acc.inc++
    }
    acc.prev = current
    return acc
  }
  const res = data.reduce(reducer, { prev: null, inc: 0 })
  return res.inc
}

function solution2(data) {
  let prev = null
  let inc = 0
  for (let i = 0; i < data.length - 2; i++) {
    const current = data[i] + data[i + 1] + data[i + 2]
    if (prev && prev < current) {
      inc++
    }
    prev = current
  }
  return inc
}

const data = fs
  .readFileSync(`${__dirname}/advent_01_input.txt`, 'utf8')
  .split('\n')
  .map((el) => parseInt(el))

console.log(solution1(data))
console.log(solution2(data))
