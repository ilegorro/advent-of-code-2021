'use strict'
const fs = require('fs')

function solution1(data) {
  let counter = 0
  data.forEach((element) => {
    const [patternData, numbers] = element.split(' | ').map((el) => {
      return el.split(' ')
    })
    numbers.forEach((num) => {
      if (
        num.length === 2 ||
        num.length === 3 ||
        num.length === 4 ||
        num.length === 7
      ) {
        counter++
      }
    })
  })
  return counter
}
function solution2(data) {
  let count = 0
  data.forEach((element) => {
    const [patternData, numbers] = element.split(' | ').map((el) => {
      return el.split(' ')
    })

    const patternFor1 = patternData.filter((dig) => dig.length === 2)[0]
    const patternFor7 = patternData.filter((dig) => dig.length === 3)[0]
    const patternFor4 = patternData.filter((dig) => dig.length === 4)[0]

    const middleAndLeftTop = patternFor4
      .split('')
      .filter((el) => patternFor1.indexOf(el) === -1)
      .join('')

    let result = ''
    numbers.forEach((num) => {
      if (num.length === 2) {
        result += '1'
      } else if (num.length === 3) {
        result += '7'
      } else if (num.length === 4) {
        result += '4'
      } else if (num.length === 7) {
        result += '8'
      } else if (num.length === 6) {
        // 0, 6 or 9
        if (
          num.indexOf(patternFor1[0]) === -1 ||
          num.indexOf(patternFor1[1]) === -1
        ) {
          result += '6'
        } else if (
          num.indexOf(patternFor4[0]) !== -1 &&
          num.indexOf(patternFor4[1]) !== -1 &&
          num.indexOf(patternFor4[2]) !== -1 &&
          num.indexOf(patternFor4[3]) !== -1
        ) {
          result += '9'
        } else {
          result += '0'
        }
      } else {
        // 2, 3 or 5
        if (
          num.indexOf(patternFor1[0]) !== -1 &&
          num.indexOf(patternFor1[1]) !== -1
        ) {
          result += '3'
        } else if (
          num.indexOf(middleAndLeftTop[0]) !== -1 &&
          num.indexOf(middleAndLeftTop[1]) !== -1
        ) {
          result += '5'
        } else {
          result += '2'
        }
      }
    })

    count += +result
  })
  return count
}

const data = fs
  .readFileSync(`${__dirname}/advent_08_input.txt`, 'utf8')
  .split('\n')

console.log(solution1(data))
console.log(solution2(data))
