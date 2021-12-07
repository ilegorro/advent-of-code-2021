'use strict'
const fs = require('fs')

function solution1(data) {
  let result = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < data.length; i++) {
    let fuel = 0
    data.forEach((element) => {
      fuel += Math.abs(i - element)
    })
    result = Math.min(result, fuel)
  }

  return result
}
function solution2(data) {
  let result = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < data.length; i++) {
    let fuel = 0
    data.forEach((element) => {
      const steps = Math.abs(i - element)
      for (let j = 1; j <= steps; j++) {
        fuel += j
      }
    })
    result = Math.min(result, fuel)
  }

  return result
}

const data = fs
  .readFileSync(`${__dirname}/advent_07_input.txt`, 'utf8')
  .split(',')
  .map((el) => +el)

console.log(solution1(data))
console.log(solution2(data))
