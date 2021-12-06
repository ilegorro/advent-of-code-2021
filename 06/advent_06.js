'use strict'
const fs = require('fs')

function solution1(data) {
  const result = [...data]
  let prevLength = data.length
  for (let day = 0; day < 80; day++) {
    let newFish = 0
    result.forEach((element, idx) => {
      if (element === 0) {
        result[idx] = 6
        newFish++
      } else {
        result[idx] = element - 1
      }
    })
    for (let i = 0; i < newFish; i++) {
      result.push(8)
    }
    const currentLength = result.length
    const rate = (currentLength / prevLength).toFixed(2)
    console.log({ prevLength, currentLength, rate })
    prevLength = currentLength
  }
  return result.length
}
function solution2(data) {
  // f(x) = a*(1 + r)^x
  // a - initial amount
  // r - growth rate
  // x - number of time intervals
  const a = data.length
  const x = 256

  return undefined
}

const data = fs
  .readFileSync(`${__dirname}/advent_06_input.txt`, 'utf8')
  .split(',')
  .map((el) => +el)

console.log(solution1(data))
console.log(solution2(data))
