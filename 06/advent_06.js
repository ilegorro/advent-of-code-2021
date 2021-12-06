'use strict'
const fs = require('fs')

function solution1(data) {
  const result = [...data]
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
  }
  return result.length
}
function solution2(data) {
  let stateCounts = new Array(9).fill(0)

  //count fish of each initial state
  data.forEach((el) => stateCounts[el]++)

  for (let i = 0; i < 256; i++) {
    //every day all states except 0 decrease by 1
    const [zeros, ...rest] = stateCounts

    // all zeros become six
    rest[6] += zeros

    // new fish with state eight
    rest[8] = zeros

    stateCounts = rest
  }

  return stateCounts.reduce((acc, el) => acc + el, 0)
}

const data = fs
  .readFileSync(`${__dirname}/advent_06_input.txt`, 'utf8')
  .split(',')
  .map((el) => +el)

console.log(solution1(data))
console.log(solution2(data))
