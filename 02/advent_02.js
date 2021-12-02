'use strict'
const fs = require('fs')

function solution1(data) {
  let position = 0,
    depth = 0
  data.forEach((el) => {
    const [direction, value] = el.split(' ')
    switch (direction) {
      case 'forward':
        position += +value
        break
      case 'down':
        depth += +value
        break
      case 'up':
        depth -= +value
        break
      default:
        break
    }
  })
  return position * depth
}

function solution2(data) {
  let position = 0,
    depth = 0,
    aim = 0
  data.forEach((el) => {
    const [direction, value] = el.split(' ')
    switch (direction) {
      case 'forward':
        position += +value
        depth += +value * aim
        break
      case 'down':
        aim += +value
        break
      case 'up':
        aim -= +value
        break
      default:
        break
    }
  })
  return position * depth
}

const data = fs
  .readFileSync(`${__dirname}/advent_02_input.txt`, 'utf8')
  .split('\n')

console.log(solution1(data))
console.log(solution2(data))
